import { Form } from "./styles";

interface formContainerProps {
    children: React.ReactNode
}

const FormContainer: React.FC<formContainerProps> = ({children}) => {
    return ( 
        <Form>
            {children}
        </Form>
    );
}
 
export default FormContainer;