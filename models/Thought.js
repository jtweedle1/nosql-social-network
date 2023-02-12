const { Schema, model } = require('mongoose');

//schema to create reaction model
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody:  {
          type: String,
          required: true,
          maxLength: 280
        },
      username: {
          type: String,
          required: true
      },
      createdAt:  {
        type: Date,
        default: Date.now,
        get: value => value.toDateString()
      }
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
    }
  );

// schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt:  {
        type: Date,
        default: Date.now,
        get: value => value.toDateString()
      },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
        virtuals: true,
        getters: true,
    },
  }
);

// total reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
