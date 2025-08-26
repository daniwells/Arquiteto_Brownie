import { useSearchParams } from "next/navigation";

const ErrorContent = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <>
      <h1>Erro</h1>
      {error === "AccessDenied" ? (
        <p
          style={{
            maxWidth: "250px",
            wordBreak: "break-word",
            whiteSpace: "normal"
          }}
        >
          Seu e-mail não está autorizado a acessar esta rota!
        </p>
      ) : (
        <p
          style={{
            maxWidth: "250px",
            wordBreak: "break-word",
            whiteSpace: "normal"
          }}
        >
          Ocorreu um erro: {error}
        </p>
      )}
    </>
  );
}

export default ErrorContent;