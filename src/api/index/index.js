import axios from 'axios'

export function upload(that,file) {
  const uploadUrl = `${that.$webUrl}/admin/adminUpload/uploadWordImg`
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: uploadUrl,
    data: file
  });
}




