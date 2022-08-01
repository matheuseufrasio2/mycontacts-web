import { HttpClient } from './utils/HttpClient';

class ContactsServiceLayer {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  createContact(contact) {
    return this.httpClient.post('/contacts', { body: contact });
  }

  updateContact(id, contact) {
    return this.httpClient.put(`/contacts/${id}`, { body: contact });
  }
}

export const ContactsService = new ContactsServiceLayer();
