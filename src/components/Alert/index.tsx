import { GrAlert } from 'react-icons/gr';
import './Alert.scss';
export default function Alert({ children }: any) {
    return (
        <div className="alert display-flex">
            <GrAlert className="alert__icon" />
            {children}
        </div>
    );
}
