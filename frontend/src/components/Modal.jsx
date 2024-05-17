import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';


export default function TaskModal({ isOpen, modalHeader, item, onSave, toggle }) {
    const [activeItem, setActiveItem] = useState(item);
    const handleChange = (e) => {
        let { name, value } = e.target;
        
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        
        setActiveItem({ ...activeItem, [name]: value });
    };
    
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{modalHeader}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup floating>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Title"
                            type="text"
                            value={activeItem.title}
                            onChange={handleChange}
                        />
                        <Label for="title">
                            Title
                        </Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="description"
                            name="description"
                            placeholder="Description"
                            type="textarea"
                            value={activeItem.description}
                            onChange={handleChange}
                        />
                        <Label for="description">
                            Description
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="completed"
                            name="completed"
                            type="checkbox"
                            onChange={handleChange}
                            checked={activeItem.completed}
                        />{' '}
                        <Label for="completed">
                            Completed?
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=> {
                    toggle()
                    onSave(activeItem)
                }}>
                    Submit
                </Button>
            </ModalFooter>
        </Modal>
    )
}