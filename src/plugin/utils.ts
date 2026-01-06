import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import type { ParserServices, TSESTree } from '@typescript-eslint/utils';
import type { RuleContext as TSESLintRuleContext } from '@typescript-eslint/utils/ts-eslint';
import type { RuleContext, RuleContextTypeOptions } from '@eslint/core';
import { TypeFlags } from 'typescript';
import type { Type, TypeChecker } from 'typescript';

export function getTypeFromESTreeNode(services: ParserServices, checker: TypeChecker, node: TSESTree.Node): Type {
    const tsNode = services.esTreeNodeToTSNodeMap.get(node);
    return checker.getTypeAtLocation(tsNode);
}

export function isNullishLiteral(node: TSESTree.Node): boolean {
    return (
        (node.type === AST_NODE_TYPES.Literal && node.value == null) ||
        (node.type === AST_NODE_TYPES.Identifier && node.name === 'undefined')
    );
}

export function isNullOrUndefined(type: Type): boolean {
    return (type.flags & (TypeFlags.Null | TypeFlags.Undefined)) !== 0;
}

export function isTypeNullable(type: Type): boolean {
    const isUnionWithNullable = type.isUnion() && type.types.some((t) => isNullOrUndefined(t));
    return isNullOrUndefined(type) || isUnionWithNullable;
}

export function isAnyOrUnknown(type: Type): boolean {
    return (type.flags & TypeFlags.Any) !== 0 || (type.flags & TypeFlags.Unknown) !== 0;
}

// UGLY HACK: This is a hack to adapt the context to the type expected by the ESLintUtils.getParserServices function
// I don't know why they defined their own types, when eslint already has a type for the context
export function getParserServices<T extends RuleContextTypeOptions>(context: RuleContext<T>): ParserServices {
    return ESLintUtils.getParserServices(context as unknown as Readonly<TSESLintRuleContext<string, unknown[]>>);
}

export function checkUnnecessaryOperator<
    MessageIds extends string,
    T extends RuleContextTypeOptions & { MessageIds: MessageIds; RuleOptions: unknown[] },
>(context: RuleContext<T>, node: TSESTree.LogicalExpression, operator: '||' | '??', messageId: MessageIds): void {
    if (node.operator !== operator || !isNullishLiteral(node.right)) {
        return;
    }

    const services = getParserServices<T>(context);

    if (!services.program) return;

    const checker = services.program.getTypeChecker();
    const leftType = getTypeFromESTreeNode(services, checker, node.left);

    if (!isAnyOrUnknown(leftType) && !isTypeNullable(leftType)) {
        context.report({
            node,
            messageId,
        });
    }
}
