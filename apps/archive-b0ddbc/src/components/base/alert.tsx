import { VscError, VscWarning, VscInfo, VscPass } from "react-icons/vsc";

const AlertBase: React.FC<AlertBaseProps> = ({ message, type, Icon }) => {
  return (
    <div className={`alert alert-${type} shadow-lg`}>
      <div>
        <Icon className="w-6 h-6" />
        <span>{message}</span>
      </div>
    </div>
  );
};

const AlertError: React.FC<AlertProps> = (props) => (
  <AlertBase type="error" Icon={VscError} {...props} />
);

const AlertWarning: React.FC<AlertProps> = (props) => (
  <AlertBase type="warning" Icon={VscWarning} {...props} />
);

const AlertInfo: React.FC<AlertProps> = (props) => (
  <AlertBase type="info" Icon={VscInfo} {...props} />
);

const AlertSuccess: React.FC<AlertProps> = (props) => (
  <AlertBase type="success" Icon={VscPass} {...props} />
);

const Alert = {
  Error: AlertError,
  Warning: AlertWarning,
  Info: AlertInfo,
  Success: AlertSuccess,
};

interface AlertBaseProps {
  type: "error" | "warning" | "info" | "success";
  Icon: typeof VscError | typeof VscWarning | typeof VscInfo | typeof VscPass;
  message: string;
}

type AlertProps = Pick<AlertBaseProps, "message">;

export default Alert;
