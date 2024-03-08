import {useSelector} from "react-redux";
import SectionTitle from "../components/SectionTitle.jsx";
import {CartItemList} from "../components/CartItemList.jsx";
import {WishlistItem} from "../components/WishlistItem.jsx";


export const Wishes = () => {

    const wishlistItems = useSelector((state) => state.wishlistState.wishListItems)

    const numItemsInWishlist = useSelector((state) => state.wishlistState.numItemsInWishList)
    if (numItemsInWishlist === 0) {
        return <SectionTitle text='Your Wishlist is Empty'/>
    }

    return (
        <>
            <SectionTitle text='Wishlist'/>
            <div className= 'grid md:grid-cols-2 gap-x-6'>
                {
                    wishlistItems.map((item) => {
                        return <WishlistItem key={item.wishListID} wishlistItem={item}/>
                    })
                }
            </div>
        </>
    )

}