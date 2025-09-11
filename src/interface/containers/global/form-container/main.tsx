import { Form } from './styles';

interface formContainerProps {
  children: React.ReactNode;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  style?: string;
}

const FormContainer: React.FC<formContainerProps> = ({ children, handleSubmit, style }) => {
  return <Form $style={style} onSubmit={handleSubmit}>{children}</Form>;
};

export default FormContainer;
