// http://json-schema-faker.js.org/
const schema = {
    "type": "object",
    "properties": {
      "achievements": {
        "type": "array",
        "minItems": 10,
        "maxItems": 10,
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "$ref": "#/definitions/stringId"
            },
            "details": {
              "$ref": "#/definitions/achievementDetail"
            },
            "relationships": {
              "type": "object",
              "properties": {
                "recommendations": {
                  
                  "type": "array",
                  "minItems": 3,
                  "maxItems": 5,
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "jsonPath": "$..activities[*].id"
                      },
                      "details": {
                        "$ref": "#/definitions/activityDetail"
                      }
                    },
                    "required": [
                      "id",
                      "details"
                    ]
                  }
                  
                  
                }
              },
              "required": [
                "recommendations"
              ]
            }
          },
          "required": [
            "id",
            "details",
            "relationships"
          ]
        }
      },
      "activities": {
        "type": "array",
        "minItems": 100,
        "maxItems": 100,
        "uniqueItems" : true,
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "$ref": "#/definitions/stringId"
            }
          },
          "required": [
            "id"
          ]
        }
      },
      "completions": {
        "type": "array",
        "minItems": 100,
        "maxItems": 100,
        "uniqueItems" : true,
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "jsonPath": "$..activities[*].id"
            },
            "updates" : {
              "type": "array",
              "minItems": 1,
              "maxItems": 3,
              "items" : {
                "type": "object",
                "properties": {
                  "achievementId" : {
                    "jsonPath": "$..achievements[*].id"
                  },
                  "progress" : {
                    "type": "number",
                    "minimum": 0.55,
                    "maximum": 1.0
                  }
                },
                "required": [
                  "achievementId",
                  "progress"
                ]
              }
            }
          },
          "required": [
            "id",
            "updates"
          ]
        }
      }
    },
    "required": [
      "achievements",
      "activities",
      "completions"
    ],
    "definitions": {
      "stringId": {
        "type": "string",
        "pattern": "^[1-2][0-9]{9}$"
      },
      "achievementDetail": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "faker": {
              "fake": "{{random.word}} Achievement"
            }
          },
          "description": {
            "type": "string",
            "faker": "lorem.paragraph"
          },
          "progress": {
            "type": "number",
            "minimum": 0,
            "maximum": 0.5
          }
        },
        "required": [
          "title",
          "description",
          "progress"
        ]
      },
      "activityDetail": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "faker": {
              "fake": "{{random.word}} {{random.number}}"
            }
          },
          "description": {
            "type": "string",
            "faker": "lorem.paragraph"
          },
          "type": {
            "type": "string",
            "pattern": "(TASK|EVENT)"
          }
        },
        "required": [
          "title",
          "description",
          "type"
        ]
      }
    }
  };

module.exports = schema;