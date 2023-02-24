import { Button } from '~/components';
import { ButtonTypes } from '~/constants/enums';
import { Address } from '~/constants/interfaces';

type SavedAddressProps = {
    savedAddresses: Array<Address>;
    onUse: (addressId: string) => void;
};

export default function SavedAddress({ savedAddresses, onUse }: SavedAddressProps) {
    return (
        <div className="saved-card">
            <div className="saved-card-row">
                <h5 className="saved-card-row__item">Fullname</h5>
                <h5 className="saved-card-row__item">AddressLine</h5>
                <h5 className="saved-card-row__item">Telephone</h5>
                <h5 className="saved-card-row__item saved-card-row__item-button"></h5>
            </div>
            {savedAddresses.map((savedAddress) => {
                return (
                    <div className="saved-card-row">
                        <h5 className="saved-card-row__item">{savedAddress.fullName}</h5>
                        <h5 className="saved-card-row__item">{savedAddress.addressLine}</h5>
                        <h5 className="saved-card-row__item">{savedAddress.telephone}</h5>
                        <div className="saved-card-row__item saved-card-row__item-button">
                            <Button
                                type={ButtonTypes.USE_SAVED_CARD}
                                onClick={(e: any) => {
                                    onUse(savedAddress.id);
                                }}
                            >
                                <span>Use</span>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
