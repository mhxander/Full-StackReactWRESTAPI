import config from './config';

/**
 * The Data class uses several functions to communicate to the API. This data is passed throughout 
 * the App for use.
 */
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  //GET request to get a user from the API.
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress,password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  //POST request to create a User.
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //GET request to get course info from the API.
  async getCourse() {
    const response = await this.api('/courses', 'GET',);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  //GET request to get course details based on ID of the course requested. 
  async courseDetail(id) {
    const response = await this.api(`/courses/${id}`, 'GET',);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  //POST request to allow an authorized user to create a new course in the API.
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses/', 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //PUT request to allow an authorized user to Update a course. 
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400 || response.status === 401 || response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //Allows an authorized user to delete a course.
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
