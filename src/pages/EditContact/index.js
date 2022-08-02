import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import { ContactsService } from '../../services/ContactsService';
import { Loader } from '../../components/Loader';
import { toast } from '../../utils/toast';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';

export function EditContact() {
  // const [contact, setContact] = useState({});
  const [isLoadingContact, setIsLoadingContact] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMounted();
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
  }, [history, id, isMounted]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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

  return (
    <>
      <Loader isLoading={isLoadingContact} />

      <PageHeader title={isLoadingContact ? 'Carregando...' : `Editar ${contactName}`} />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
