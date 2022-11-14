import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ContactsService } from '../../services/ContactsService';
import { toast } from '../../utils/toast';
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';

export function useEditContact() {
  const [isLoadingContact, setIsLoadingContact] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contactData);

          setIsLoadingContact(false);
          setContactName(contactData.name);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }

    loadContact();
  }, [history, id, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const updatedContact = await ContactsService.updateContact(id, contact);

      setContactName(updatedContact.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato',
      });
    }
  }

  return {
    isLoadingContact,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
