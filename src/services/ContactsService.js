import { HttpClient } from './utils/HttpClient';

class ContactsServiceLayer {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContact(contact) {
    return this.httpClient.post('/contacts', { body: contact });
  }
}

export const ContactsService = new ContactsServiceLayer();
