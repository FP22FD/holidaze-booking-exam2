export class ErrorHandler {
  _response;

  constructor(response: Response) {
    this._response = response;
  }

  async getErrorMessage() {
    if (this._response.ok) {
      return '';
    }

    let errorMessage = '';

    if (this._response.status === 400) {
      // 400 - Bad request
      const data = await this._response.json();
      errorMessage = data.errors[0].message;
    } else if (this._response.status === 401) {
      // 401 - Unauthorized
      errorMessage = 'Invalid authentication credentials!';
    } else if (this._response.status === 404) {
      // 404 - Not Found
      errorMessage = 'The requested resource was not found!';
    } else if (this._response.status === 409) {
      // 409 - Conflict
      const data = await this._response.json();
      errorMessage = data.errors[0].message;
    } else {
      // 500 - Internal Server Error and other server-side errors
      errorMessage = 'Unknown error! Please retry later.';
    }
    return errorMessage;
  }
}
