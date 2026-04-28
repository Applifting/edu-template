
const isTypePredicate = (node) => {
  const predicate = node?.returnType?.typeAnnotation;

  if (!predicate) return null;

  return predicate.type === "TSTypePredicate" ? predicate : null;
};

const reportIfTypePredicate = (context, node) => {
  const predicate = isTypePredicate(node);

  if (predicate) {
    context.report({
      node: predicate,
      messageId: "useNarrowland",
    });
  }
};

const typeguardWarningRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Warn whenever a function declares a boolean type guard or assertion return type.",
      recommended: false,
    },
    schema: [],
    messages: {
      useNarrowland:
        "Skip custom type guards - `narrowland` likely already provides a documented, tested utility.",
    },
  },
  create(context) {
    return {
      FunctionDeclaration(node) {
        reportIfTypePredicate(context, node);
      },
      FunctionExpression(node) {
        reportIfTypePredicate(context, node);
      },
      ArrowFunctionExpression(node) {
        reportIfTypePredicate(context, node);
      },
      TSDeclareFunction(node) {
        reportIfTypePredicate(context, node);
      },
      MethodDefinition(node) {
        if (node.value) {
          reportIfTypePredicate(context, node.value);
        }
      },
    };
  },
};

export const noCustomTypeguardPlugin = {
  rules: {
    "typeguard-warning": typeguardWarningRule,
  },
};

