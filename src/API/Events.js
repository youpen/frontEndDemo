import axios from 'axios'

// TODO 所有请求出现token过期要清除本地token

export async function fetchEvents (payload = {channel: undefined, date:{}}) {
  const { channel, date, startIndex } = payload
  const after = date && date.after
  const before = date && date.before
  const offset = startIndex || undefined;
  const options = {
    method: 'GET',
    headers: { 'x-blackcat-token': window.__token__ },
    url: 'api/v1/events',
    params: {
      after,
      before,
      channels: channel,
      offset,
      limit: 25, // TODO 不写死
    }
  };
  try {
    const res = await axios(options)
    const { data } = res;
    console.log('events------', res)
    return data;
  } catch (e) {
    if (e.response.status === 403) {
      clearToken()
      // TODO 回到登录页
    }
    throw new Error('events API error')
  }
}

export async function fetchComments (payload = {id: 1}) {
  const options = {
    method: 'GET',
    headers: { 'x-blackcat-token': window.__token__ },
    url: `api/v1/events/${payload.id}/comments`,
  };
  try {
    const res = await axios(options)
    const { data } = res;
    console.log('comments------', res)
    return data;
  } catch (e) {
    if (e.response.status === 403) {
      clearToken()
    }
    throw new Error('comments API error')
  }
}

export async function fetchParticipants (payload = {id: 1}) {
  const options = {
    method: 'GET',
    headers: { 'x-blackcat-token': window.__token__ },
    url: `api/v1/events/${payload.id}/participants`,
  };
  try {
    const res = await axios(options)
    const { data } = res;
    console.log('participants------', res)
    return data;
  } catch (e) {
    if (e.response.status === 403) {
      clearToken()
    }
    throw new Error('participants API error')
  }
}

function clearToken() {
  window.__token__ = null;
  localStorage.removeItem('__token__')
}

export async function fetchChannels () {
  const options = {
    method: 'GET',
    headers: { 'x-blackcat-token': window.__token__ },
    url: `api/v1/channels`,
  };

  try {
    const res = await axios(options)
    const { data } = res;
    console.log('channels------', res)
    return data;
  } catch (e) {
    if (e.response.status === 403) {
      clearToken()
    }
    throw new Error('channels API error')
  }
}

const testData = {
  'events': [
    {
      'id': 1,
      'name': 'Activity Title Name Make it Longer May Longer than One Line',
      'creator_id': 5,
      'channel_id': 5,
      'begin_time': '2019-05-27T11:07:54.203Z',
      'end_time': '2019-05-28T11:07:54.204Z',
      'create_time': '2019-05-27T11:07:54.204Z',
      'update_time': '2019-05-27T11:07:54.204Z',
      'location': 'Marina Bay Sands',
      'location_detail': '10 Bayfront Ave, S018956',
      'description': '[No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti. Maecenas et enim odio. Nullam massa metus, varius quis vehicula sed, pharetra mollis erat. In quis viverra velit. Vivamus placerat, est nec hendrerit varius, enim dui hendrerit magna, ut pulvinar nibh lorem vel lacus. Mauris a orci iaculis, hendrerit eros sed, gravida leo. In dictum mauris vel augue varius there is south north asim.',
      'createdAt': '2019-05-27T11:07:54.204Z',
      'updatedAt': '2019-05-27T11:07:54.204Z',
      'channel': {
        'id': 5,
        'name': 'Travel',
        'createdAt': '2019-05-27T11:07:54.198Z',
        'updatedAt': '2019-05-27T11:07:54.198Z'
      },
      'creator': {
        'id': 5,
        'username': 'user_2',
        'password': 'df10ef8509dc176d733d59549e7dbfaf',
        'email': 'user_2@example.com',
        'salt': 'abc',
        'avatar': 'https://coding.net/static/fruit_avatar/Fruit-3.png',
        'createdAt': '2019-05-27T11:07:54.199Z',
        'updatedAt': '2019-05-27T11:07:54.199Z'
      },
      'images': [
        'https://tse2-mm.cn.bing.net/th?id=OIP.w8XC0KPitDfMEeSv9P3GxgHaEt&w=248&h=160&c=7&o=5&dpr=2&pid=1.7',
        'https://tse2-mm.cn.bing.net/th?id=OIP.B7gjATIkLyifGdknxysjVwHaFj&w=222&h=167&c=7&o=5&dpr=2&pid=1.7',
        'https://tse2-mm.cn.bing.net/th?id=OIP.NI9vpiDmGzrQLPKq23e2_wHaFj&w=234&h=173&c=7&o=5&dpr=2&pid=1.7',
        'https://tse2-mm.cn.bing.net/th?id=OIP.rzUYVz0YoOqkmoehDQcKRgHaEo&w=295&h=181&c=7&o=5&dpr=2&pid=1.7',
        'https://tse2-mm.cn.bing.net/th?id=OIP.wTqIPNLDZ96_gPsHc-pplQHaFI&w=228&h=160&c=7&o=5&dpr=2&pid=1.7'
      ],
      'likes_count': 11,
      'goings_count': 11,
      'me_likes': false,
      'me_going': false
    }
  ]
}