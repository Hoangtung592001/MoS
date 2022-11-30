import localizations from '~/constants/locallizations';
import './BasketTable.scss';

export default function BasketTable() {
    return (
        <table className="basket-table">
            <tr className="basket-table-row">
                <th className="basket-table-row__item1">
                    {localizations.basketItems} (2 {localizations.items})
                </th>
                <th className="basket-table-row__item2">{localizations.price}</th>
                <th className="basket-table-row__item3">{localizations.quantity}</th>
            </tr>
            <tr className="basket-table-row">
                <td className="basket-table-row__item1">Alfreds Futterkiste</td>
                <td className="basket-table-row__item2">Maria Anders</td>
                <td className="basket-table-row__item3">Germany</td>
            </tr>
        </table>
    );
}
