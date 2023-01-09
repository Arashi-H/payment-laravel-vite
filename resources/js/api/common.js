import axios from 'axios'

import { API_URL } from '../constants/'

const authHeader = {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
}

const commonApi = {
  getAchievement: (userId) => axios.post(`${API_URL}/getAchievement`, {
    userId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getCampus: () => axios.get(`${API_URL}/campus`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getCertification: (userId) => axios.post(`${API_URL}/getCertification`, {
    userId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getRanking: () => axios.post(`${API_URL}/getRanking`, {}, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getChartData: (userId, range) => axios.post(`${API_URL}/getChartData`, {
    userId,
    range
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  searchUser: (search) => axios.post(`${API_URL}/chat/searchUsers`, {
    search: search
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getLiveUsers: () => axios.get(`${API_URL}/chat/liveUsers`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getActiveCertification: (userId, range) => axios.post(`${API_URL}/getActiveCertification`, {
    userId,
    range
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getActiveMedal: (userId, range) => axios.post(`${API_URL}/getActiveMedal`, {
    userId,
    range
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getNotification: () => axios.post(`${API_URL}/getNotification`,{}, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  notification: () => axios.get(`${API_URL}/notification`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  notificationUser: () => axios.get(`${API_URL}/notification-user`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getEvents: () => axios.post(`${API_URL}/getEvents`, {}, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getProgress: (userId) => axios.post(`${API_URL}/getProgress`, {
    userId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),
  
  getCourseCategory: () => axios.get(`${API_URL}/course-category/all`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getLastVideo: (userId) => axios.post(`${API_URL}/getLastVideo`, {
    userId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getCourses: (type, category) => axios.post(`${API_URL}/getCourses`, {
    type, category
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getForumByCategory: (categoryId) => axios.post(`${API_URL}/getForumByCategory`, {
    categoryId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getCourseDetail: (userId, courseId) => axios.post(`${API_URL}/getCourseDetail`, {
    userId,
    courseId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getWhatLearn: (courseId) => axios.post(`${API_URL}/getWhatLearn`, {
    courseId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getClasses: (courseId) => axios.post(`${API_URL}/getClasses`, {
    courseId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getForumByCourse: (courseId) => axios.post(`${API_URL}/getForumByCourse`, {
    courseId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getRelativeCourse: (courseId) => axios.post(`${API_URL}/getRelativeCourse`, {
    courseId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getCourseClass: (userId, courseId) => axios.post(`${API_URL}/getCourseClass`, {
    userId,
    courseId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getInstructors: () => axios.post(`${API_URL}/getInstructors`, {}, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getInstructorsDetail: (instructorId) => axios.post(`${API_URL}/getInstructorsDetail`, {
    instructorId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getCourseByInstructor: (instructorId) => axios.post(`${API_URL}/getCourseByInstructor`, {
    instructorId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getForumByInstructor: (instructorId) => axios.post(`${API_URL}/getForumByInstructor`, {
    instructorId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getCustomizeModel: (userId) => axios.post(`${API_URL}/getCustomizeModel`, {
    userId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getMapData: (userId) => axios.post(`${API_URL}/getMapData`, {
    userId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  updateEnjoy: (userId, forumId, status) => axios.post(`${API_URL}/updateEnjoy`, {
    userId,
    forumId,
    status
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  updateFollow: (userId, instructorId, status) => axios.post(`${API_URL}/updateFollow`, {
    userId,
    instructorId,
    status
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  setReadNotification: (userId, type) => axios.post(`${API_URL}/setReadNotification`, {
    userId,
    type
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  setReadNotificationById: (userId, notificationId) => axios.post(`${API_URL}/setReadNotificationById`, {
    userId,
    notificationId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  setMarkVideo: (userId, videoId) => axios.post(`${API_URL}/setMarkVideo`, {
    userId,
    videoId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  setLastTime: (id, lastTime, userId) => axios.post(`${API_URL}/setLastTime`, {
    id, lastTime, userId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  setCustomizeModel: (userId, background, gendor, clothes, hair, shoes, face, skin ) => axios.post(`${API_URL}/setCustomizeModel`, {
    userId,
    background,
    gendor,
    clothes,
    hair,
    shoes,
    face,
    skin
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  setMapData: (userId, data) => axios.post(`${API_URL}/setMapData`, {
    userId, data
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getWatchLater: () => axios.get(`${API_URL}/course-watch-later/users/getWatchLater`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  addWatchLater: (id_course) => axios.post(`${API_URL}/course-watch-later/users/addWatchLater`, {
    id_course
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getCourseQuestionUser: (courseId) => axios.post(`${API_URL}/course-question/getCourseQuestionUser`, {
    courseId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getAnswerUser: (questionId) => axios.post(`${API_URL}/course-question-answer/getAnswerUser`, {
    questionId
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getTokenAgora: () => axios.get(`${API_URL}/getRTCToken`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),

  getLecturesByBreak: (dateStart, dateEnd) => axios.post(`${API_URL}/course-live/interval`, {
    initial: dateStart.toISOString().split('T')[0],
    final: dateEnd.toISOString().split('T')[0]
  }, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }),
}

export default commonApi