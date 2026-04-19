import type { ESLint, Rule } from 'eslint';

const rule: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description:
                'Forbid calling .toString() directly on Uint8Array — use new TextDecoder().decode(...) or Buffer-free conversions instead.',
        },
        schema: [],
        messages: {
            forbidden:
                'Calling .toString() on a Uint8Array is forbidden. Use new TextDecoder().decode(value) or a hex helper instead.',
        },
    },
    create(context: Rule.RuleContext): Rule.RuleListener {
        return {
            CallExpression(node: Rule.Node): void {
                if (node.type !== 'CallExpression') {
                    return;
                }
                const callee = node.callee;
                if (callee.type !== 'MemberExpression') {
                    return;
                }
                if (callee.computed) {
                    return;
                }
                const property = callee.property;
                if (property.type !== 'Identifier' || property.name !== 'toString') {
                    return;
                }

                const services = context.sourceCode.parserServices;
                if (
                    services === undefined ||
                    services.program === undefined ||
                    services.esTreeNodeToTSNodeMap === undefined
                ) {
                    return;
                }

                const checker = services.program.getTypeChecker();
                const tsNode = services.esTreeNodeToTSNodeMap.get(callee.object);
                if (tsNode === undefined) {
                    return;
                }
                const objectType = checker.getTypeAtLocation(tsNode);
                const symbol = objectType.getSymbol();
                if (symbol === undefined) {
                    return;
                }

                const name: string = symbol.getName();
                if (name === 'Uint8Array' || name.endsWith('Uint8Array')) {
                    context.report({ node, messageId: 'forbidden' });
                }
            },
        };
    },
};

const plugin: ESLint.Plugin = {
    rules: {
        'no-uint8array-tostring': rule,
    },
};

export default plugin;
