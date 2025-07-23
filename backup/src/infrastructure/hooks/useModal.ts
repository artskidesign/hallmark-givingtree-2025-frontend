import { useState } from 'react';

const useModal: (initialValue: boolean) =>[boolean, () => void, () => void] = initialValue => {

    const [isModalVisible, setVisibility] = useState<boolean>(initialValue);
    const showModal = () => setVisibility(true);
    const hideModal = () => setVisibility(false);
    return [isModalVisible, hideModal, showModal];
}

export default useModal;