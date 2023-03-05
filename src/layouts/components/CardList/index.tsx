import { CardItem } from '~/components';
import './CardList.scss';
export default function CardList() {
    return (
        <ul className="card-list">
            <li className="card-list__item">
                <CardItem
                    url="https://assets.brightspot.abebooks.a2z.com/dims4/default/7a1be20/2147483647/strip/true/crop/800x600+0+0/resize/1600x1200!/format/webp/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.amazonaws.com%2Fdc%2Fc0%2F1e44eb5b4f64aef77543b49cd4d2%2Fbooks-promo.png"
                    title="Books"
                    description="Fill your bookshelves with used books, the latest bestsellers, collectible books and forgotten out-of-print titles from years gone by."
                    textLink="Shop books"
                />
            </li>
            <li className="card-list__item">
                <CardItem
                    url="https://assets.brightspot.abebooks.a2z.com/dims4/default/d09318b/2147483647/strip/true/crop/800x600+0+0/resize/1600x1200!/format/webp/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.amazonaws.com%2F31%2F59%2F6691826d434db12352db0c14130e%2Fpromo-used.jpg"
                    title="Used Books"
                    description="Giving used books new life is what we do best. The choice of used books is massive - from classic novels to children's books, and so much more."
                    textLink="Shop used books"
                />
            </li>
            <li className="card-list__item">
                <CardItem
                    url="https://assets.brightspot.abebooks.a2z.com/dims4/default/695ae48/2147483647/strip/true/crop/800x600+0+0/resize/1600x1200!/format/webp/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.amazonaws.com%2F95%2F94%2F986bd71e4b708ab6d69d76a162da%2Fpromo-sale.jpg"
                    title="Seller Sales"
                    description="Each month, select sellers offer their items for sale on AbeBooks at huge discounts, making it easy to buy books, art and collectibles online."
                    textLink="Start saving"
                />
            </li>
            <li className="card-list__item">
                <CardItem
                    url="https://assets.brightspot.abebooks.a2z.com/dims4/default/4003f33/2147483647/strip/true/crop/800x600+0+0/resize/1600x1200!/format/webp/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.amazonaws.com%2F3e%2F61%2Feb01452f4aac8bc3e9d7546f3004%2Fpromo-rare.jpg"
                    title="Rare Books"
                    description="Trusted independent sellers offer for sale curated rare books, first editions and collectible signed copies of your favorite book."
                    textLink="Discover rare books"
                />
            </li>
        </ul>
    );
}