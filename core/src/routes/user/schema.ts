import { FastifySchema } from "fastify";

export const getOneUserSchema: FastifySchema = {
  description: "Returns user by ID",
  tags: ["User"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        description: "User ID",
      },
    },
  },
  response: {
    200: {
      description: "Returns user",
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
          description: "User ID",
        },
        username: {
          type: "string",
        },
        avatar: {
          type: "string",
        },
        privacy: {
          type: "boolean",
        },
        email: {
          type: "string",
          format: "email",
        },
      },
    },
    404: {
      description: "User not found",
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        error: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};

export const getAllUserSchema: FastifySchema = {
  description: "Returns all users",
  tags: ["User"],
  querystring: {
    type: "object",
    properties: {
      take: {
        type: "number",
      },
      skip: {
        type: "number",
      },
    },
  },
  response: {
    200: {
      description: "Returns array of users",
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "User ID",
          },
          username: {
            type: "string",
          },
          avatar: {
            type: "string",
          },
          privacy: {
            type: "boolean",
          },
          email: {
            type: "string",
            format: "email",
          },
        },
      },
    },
  },
};

export const createUserSchema: FastifySchema = {
  description: "Create user",
  tags: ["User"],
  body: {
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      description: "Returns user",
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
          description: "User ID",
        },
        username: {
          type: "string",
        },
        avatar: {
          type: "string",
        },
        privacy: {
          type: "boolean",
        },
        email: {
          type: "string",
          format: "email",
        },
      },
    },
  },
};

export const signInSchema: FastifySchema = {
  description: "Sign in",
  tags: ["User"],
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      description: "Returns user with tokens",
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
          description: "User ID",
        },
        username: {
          type: "string",
        },
        avatar: {
          type: "string",
        },
        privacy: {
          type: "boolean",
        },
        email: {
          type: "string",
          format: "email",
        },
        accessToken: {
          type: "string",
          format: "token",
        },
        refreshToken: {
          type: "string",
          format: "token",
        },
      },
    },
    400: {
      description: "Invalid credentials",
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        error: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};

export const signUpSchema: FastifySchema = {
  description: "Sign up",
  tags: ["User"],
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email",
      },
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      description: "Returns created user",
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
          description: "User ID",
        },
        username: {
          type: "string",
        },
        avatar: {
          type: "string",
        },
        privacy: {
          type: "boolean",
        },
        email: {
          type: "string",
          format: "email",
        },
      },
    },
    400: {
      description: "User already created",
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        error: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};

export const signOutSchema: FastifySchema = {
  description: "Sign out",
  tags: ["User"],
  security: [
    {
      Bearer: [],
    },
  ],
  response: {
    200: {
      description: "Sign out",
      type: "boolean",
    },
    401: {
      description: "Unauthorized error",
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        error: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};

export const getMeSchema: FastifySchema = {
  description: "Returns me",
  tags: ["User"],
  security: [
    {
      Bearer: [],
    },
  ],
  response: {
    200: {
      description: "Returns me",
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
          description: "User ID",
        },
        username: {
          type: "string",
        },
        avatar: {
          type: "string",
        },
        privacy: {
          type: "boolean",
        },
        email: {
          type: "string",
          format: "email",
        },
      },
    },
    401: {
      description: "Unauthorized error",
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        error: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};

export const refreshSchema: FastifySchema = {
  description: "Refresh tokens",
  tags: ["User"],
  response: {
    200: {
      description: "Refresh tokens",
      type: "object",
      properties: {
        token: {
          type: "string",
          format: "token",
          description: "Refresh token",
        },
      },
    },
    401: {
      description: "Invalid or expired token",
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        error: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};
