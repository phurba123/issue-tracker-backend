define({ "api": [
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/:issueId/view",
    "title": "api for getting single issue detail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>id of issue to view. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"issue detail found\",\n\"status\": 200,\n\"data\": [\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        },\n        assignee:[],\n        watchers:[],\n        comments:[]\n    }\n        ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoute.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueIssueidView"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/search/result",
    "title": "api for searching issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "searchText",
            "description": "<p>search string input by user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"search result\",\n\"status\": 200,\n\"data\":[\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        }\n    },\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        }\n    }\n\n]\n    \n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoute.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueSearchResult"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/:userId/reported/issues",
    "title": "api for getting issues reported by user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>id of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "skip",
            "description": "<p>number of data to skip for pagination. (query) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"reported issues of user\",\n\"status\": 200,\n\"data\": [\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        },\n        assignee:[]\n    },\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        },\n        assignee:[]\n    }\n        ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoute.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueUseridReportedIssues"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/:userId/view/all",
    "title": "api for getting issues assigned to user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>id of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "skip",
            "description": "<p>number of data to skip for pagination. (query) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"issue found for userId\",\n\"status\": 200,\n\"data\": [\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        },\n        assignee:[]\n    },\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        },\n        assignee:[]\n    }\n        ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoute.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueUseridViewAll"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/view/all",
    "title": "api for getting all issues.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "skip",
            "description": "<p>number of data to skip for pagination. (query) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All issues details found\",\n\"status\": 200,\n\"data\": [\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        },\n        assignee:[],\n        watchers:[],\n    },\n    {\n        \"issueId\":\"fdf88e38f\",\n        \"title\":\"new issue title again\",\n        \"description\":\"this is description again\",\n        \"status\":\"in-test\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fdsjf8d\",\n            \"reporterName\":\"phurba\"\n        },\n        assignee:[],\n        watchers:[],\n    }\n        ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoute.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueViewAll"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/issue/comment/create",
    "title": "api for adding comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>id of user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of issue to which comment is added to. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "comment",
            "description": "<p>comment commented by user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"issue found for userId\",\n\"status\": 200,\n\"data\": [\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        },\n        assignee:[]\n    },\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        },\n        assignee:[]\n    }\n        ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoute.js",
    "groupTitle": "issue",
    "name": "PostApiV1IssueCommentCreate"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/issue/create",
    "title": "api for creating new issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporterId",
            "description": "<p>userId of user creating issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporterName",
            "description": "<p>name of user creating issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assigneeId",
            "description": "<p>userId of user to whom issue is assigned to. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assigneeName",
            "description": "<p>userId of user to whom issue is assigned to. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"New issue Created\",\n\"status\": 200,\n\"data\": [\n    {\n        \"issueId\":\"kjfds9fd9f3\",\n        \"title\":\"new issue title\",\n        \"description\":\"this is description\",\n        \"status\":\"backlog\",\n        \"createdOn\":\"2020-03-12T16:42:58.000Z\",\n        \"reporter\":\n        {\n            \"reporterId\":\"fjsd8f8f\",\n            \"reporterName\":\"mamba\"\n        },\n        assignee:[],\n        watchers:[],\n        comments:[]\n    }\n        ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoute.js",
    "groupTitle": "issue",
    "name": "PostApiV1IssueCreate"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/issue/:issueId/add/watcher",
    "title": "api for adding user as watcher",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>id of issue to view. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "watcherName",
            "description": "<p>userId of user watching issue. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "watcherId",
            "description": "<p>userName of user watching issue. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"added as watcher\",\n\"status\": 200,\n\"data\":\n    {\n        \"watcherId\":\"fksjdf8\",\n        \"watcherName\":\"roshan sharma\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoute.js",
    "groupTitle": "issue",
    "name": "PutApiV1IssueIssueidAddWatcher"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/issue/:issueId/edit",
    "title": "api for editing issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>id of issue to view. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>new title of issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>new description of issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>new status of issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assigneeId",
            "description": "<p>userId of user to whom issue is assigned to. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assigneeName",
            "description": "<p>userId of user to whom issue is assigned to. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"issue updated\",\n\"status\": 200,\n\"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/issueRoute.js",
    "groupTitle": "issue",
    "name": "PutApiV1IssueIssueidEdit"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/user/view/all",
    "title": "api for Getting all users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All Users Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"createdOn\": \"2020-09-16T13:33:58.000Z\",\n            \"email\": \"nomail@gmail.com\",\n            \"mobileNumber\": \"91 7840962887\",\n            \"lastName\": \"sharma\",\n            \"firstName\": \"govind\",\n            \"userId\": \"dfjsh8sdfyf\"\n        },\n        {\n            \"createdOn\": \"2020-09-16T13:33:58.000Z\",\n            \"email\": \"yesmail@gmail.com\",\n            \"mobileNumber\": \"91 7840949585\",\n            \"countryName\": \"India\",\n            \"lastName\": \"sharma\",\n            \"firstName\": \"rahul\",\n            \"userId\": \"dfjsfd87\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "user",
    "name": "GetApiV1UserViewAll"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/user/:email/forgotpassword",
    "title": "api for password reset.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"reset password successfull\",\n\"status\": 200,\n\"data\": \n}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1UserEmailForgotpassword"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/user/signin",
    "title": "api for login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"login successfull\",\n\"status\": 200,\n\"data\": {\n        \"authToken\": \"32kjciOiJIsdkfjkjfkej9eu93u32oir6MTUzODgxNzIzNDUzNCwiZXhwIjskdfj89ds89f\",\n        \"userDetails\": {\n            \"email\": \"gomail@gmail.com\",\n            \"mobileNumber\": \"91 7840962887\",\n            \"lastName\": \"sharma\",\n            \"firstName\": \"roshan\",\n            \"userId\": \"389ejh7\",\n            \"createdOn\":\"2020-03-12T16:42:58.000Z\"\n    }\n}\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1UserSignin"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/user/signout",
    "title": "api to logout .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1UserSignout"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/user/signup",
    "title": "api for Registering User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Created\",\n\"status\": 200,\n\"data\": [\n    {\n        \"createdOn\": \"2020-03-12T16:42:58.000Z\",\n        \"email\": \"gomail@gmail.com\",\n        \"mobileNumber\": \"91 7384756357\",\n        \"firstName\": \"phurba\",\n        \"lastName\": \"sherpa\",\n        \"userId\": \"B1cyuc8OX\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1UserSignup"
  }
] });
