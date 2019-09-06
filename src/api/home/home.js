import axios from "../config.js"

/**
 * 获取首页数据
 */
export function getIndexInfo(pageSize, currentPage, userId) {
  const url = "/api/post/queryAllApiPost"
  const data = {
    pageSize,
    currentPage,
    userId
  }
  return axios.post(url, data)
}

/**
 * 查询所有模块帖子
 */
export function getQueryAllPost(pageSize, currentPage, postPlate, userId, postId, isAttention) {
  const url = "/api/post/queryAllPost"
  const data = {
    pageSize,
    currentPage,
    postPlate,
    userId,
    postId,
    isAttention
  }
  return axios.post(url, data)
}
/**
 * 帖子点赞
 */
export function getAddLike(userId, beLikePostId, beLikeUserId) {
  const url = "/api/post/addLike"
  const data = {
    userId,
    beLikePostId,
    beLikeUserId
  }
  return axios.post(url, data)
}
/**
 * 帖子点赞取消
 */
export function getCancelLike(userId, beLikePostId) {
  const url = "/api/post/cancelLike"
  const data = {
    userId,
    beLikePostId,
  }
  return axios.post(url, data)
}
/**
 * 点击查看帖子详情
 */
export function getPostReply(userId, postId) {
  const url = "/api/postReply/postReply"
  const data = {
    userId,
    postId
  }
  return axios.post(url, data)
}
/**
 * 添加浏览量
 */
export function getAddPageViews(userId, postId) {
  const url = "/api/post/addPageViews"
  const data = {
    userId,
    postId
  }
  return axios.post(url, data)
}
/**
 * 点赞评论和取消点赞评论
 */
export function getLikeReply(userId, replyId) {
  const url = "/api/postReply/likeReply"
  const data = {
    userId,
    replyId
  }
  return axios.post(url, data)
}
/**
 * 帖子收藏
 */
export function getAddCollection(userId, beLikePostId) {
  const url = "/api/post/addCollection"
  const data = {
    userId,
    beLikePostId
  }
  return axios.post(url, data)
}
/**
 * 取消收藏
 */
export function getCancelCollection(userId, beLikePostId) {
  const url = "/api/post/cancelCollection"
  const data = {
    userId,
    beLikePostId
  }
  return axios.post(url, data)
}
/**
 * 打赏帖子
 */
export function getAppreciationPost(userId, postId, diamonds) {
  const url = "/api/post/appreciationPost"
  const data = {
    userId,
    postId,
    diamonds
  }
  return axios.post(url, data)
}
/**
 * 世界发言的所有颜色信息
 */
export function getAllSpeechColor() {
  const url = "/api/user/allSpeechColor"
  return axios.post(url)
}
/**
 * 添加关注
 */
export function getAddAttention(userId, followedId) {
  const url = "/api/user/addAttention"
  const data = {
    userId,
    followedId
  }
  return axios.post(url, data)
}
/**
 * 添加关注
 */
export function getIntercommunication(userId, beAttentionUserId) {
  const url = "/api/user/intercommunication"
  const data = {
    userId,
    beAttentionUserId
  }
  return axios.post(url, data)
}

/**
 * 取消关注
 */
export function getCancelAttention(userId, followedId) {
  const url = "/api/user/cancelAttention"
  const data = {
    userId,
    followedId
  }
  return axios.post(url, data)
}

/**
 * 查找所有举报类型
 */
export function getFindReportType() {
  const url = "/api/post/findReportType"
  return axios.post(url)
}
/**
 * 举报帖子
 */
export function getReportPost(userId, postId, reportValue) {
  const url = "/api/post/reportPost"
  const data = {
    userId,
    postId,
    reportValue
  }
  return axios.post(url, data)
}
/**
 * 发送世界聊天
 */
export function getSendWorldChatPost(content, userId, speechColorId) {
  const url = "/api/post/sendWorldChatPost"
  const data = {
    content,
    userId,
    speechColorId
  }
  return axios.post(url, data)
}
/**
 * 评论帖子
 */
export function getReleaseComments(userId, postId, replyText, replyAudio, type, respondent, whetherAnonymous, beReplyId, replyImg) {
  const url = "/api/postReply/releaseComments"
  const data = {
    userId,
    postId,
    replyText,
    replyAudio,
    type,
    respondent,
    whetherAnonymous,
    beReplyId,
    replyImg
  }
  return axios.post(url, data)
}

/**
 * 删除评论
 */
export function getDeletePostReply(userId, replyId) {
  const url = "/api/postReply/deletePostReply"
  const data = {
    userId,
    replyId
  }
  return axios.post(url, data)
}
