const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    youtube_id: { type: String, required: [true, "videoId is mandatory"] },
    title: { type: String, required: [true, "video title is mandatory"] },
    category: { type: String, required: [true, "video category is mandatory"] },
    description: {
      type: String,
      required: [true, "video description is mandatory"],
    },
    thumbnails: {
      high: {
        url: {
          type: String,
          required: [true, "high quality image url is mandatory"],
        },
        height: {
          type: Number,
          required: [true, "high quality image height is mandatory"],
        },
        width: {
          type: Number,
          required: [true, "high quality image width is mandatory"],
        },
      },

      medium: {
        url: {
          type: String,
          required: [true, "medium quality image url is mandatory"],
        },
        height: {
          type: Number,
          required: [true, "medium quality image height is mandatory"],
        },
        width: {
          type: Number,
          required: [true, "medium quality image width is mandatory"],
        },
      },

      standard: {
        url: {
          type: String,
          required: [true, "standard quality image url is mandatory"],
        },
        height: {
          type: Number,
          required: [true, "standard quality image height is mandatory"],
        },
        width: {
          type: Number,
          required: [true, "standard quality image width is mandatory"],
        },
      },
    },
    statistics: {
      likeCount: {
        type: String,
        required: [true, "like count is mandatory"],
      },
      dislikeCount: {
        type: String,
        required: [true, "dislike count is mandatory"],
      },
      commentCount: {
        type: String,
        required: [true, "comment count is mandatory"],
      },
      viewCount: {
        type: String,
        required: [true, "view count is mandatory"],
      },
    },

    snippet: {
      publishedAt: {
        type: String,
        required: [true, "published at date is mandatory"],
      },
      channelTitle: {
        type: String,
        required: [true, "channel title is mandatory"],
      },
    },
  },
  { timestamps: { createdAt: "created_At", updatedAt: "updated_At" } }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
