import { Form } from "./styles";

interface formContainerProps {
    children: React.ReactNode
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormContainer: React.FC<formContainerProps> = ({children, handleSubmit}) => {
    return ( 
        <Form onSubmit={handleSubmit}>
            {children}
        </Form>
    );
}
 
export default FormContainer;