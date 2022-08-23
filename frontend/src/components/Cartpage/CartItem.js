import styled from "styled-components";
import {AiFillPlusCircle} from "react-icons/ai";
import {AiFillMinusCircle} from "react-icons/ai";

const CartItem = ({singleItem, setChange, change}) =>{

    const handleMinus = (itemId) =>{
        fetch(`/api/delete-cart-item/${"58bf7fa8-2892-46dd-a0dc-0f95188acea1"}/${itemId}`, {
            method: "DELETE"
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
            console.log("item in cart was discarded")
            if(change){
                setChange(false);
            } else{
                setChange(true)
            }
        })
    }

    const handlePlus = (singleItem) =>{
        fetch("/api/add-cart-item", {
            method: 'POST',
            headers:{
            'Content-type':'application/json',
            },
            body: JSON.stringify({cartId: "58bf7fa8-2892-46dd-a0dc-0f95188acea1" , item: singleItem})
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
            console.log("it worked! Adding item to the cart")                    
            if(change){
                setChange(false);
            } else{
                setChange(true)
            }
        }) 
    }

    const parsedSingleItemPrice = parseFloat(singleItem.price.slice(1,singleItem.price.length));

    return(
        <Container>
                <div>{singleItem.name}</div>
                <div>{singleItem.category}</div>
                <div>{singleItem.count}</div>
                <div>{`${singleItem.price} `}</div>
                <div>{`$${(parsedSingleItemPrice * singleItem.count).toFixed(2)}`}</div>
            <ButtonContainer>
                <StyledButton onClick={() => handleMinus(singleItem._id)}>
                    <StyledMinus></StyledMinus>
                </StyledButton>
                <StyledButton onClick={() => handlePlus(singleItem)}>
                    <StyledPlus></StyledPlus>
                </StyledButton>
            </ButtonContainer>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    align-items: center;
    width: 54vw;
    grid-template-columns: 27vw 6vw 5vw 7vw 6vw 5vw;
    margin-left: 0.4vw;
    margin-right: 1vw;
    margin-top: 0.3vh;
    margin-bottom: 0.3vh;
    padding-top: 1vh;
    padding-bottom: 1vh;
    color:white;
    background-color: rgb(255,255,255,0.5);
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const StyledButton = styled.button`
    width:1vw;
    height:2vh;
    margin:0.2vh;
    border: 0;
    background-color: transparent;
`

const StyledPlus = styled(AiFillPlusCircle)`
    width:1vw;
    height: 2vh;
    position:relative;
    left:-0.25vw;
    top:-1.4vh;
`

const StyledMinus = styled(AiFillMinusCircle)`
    width:1vw;
    height: 2vh;
    position:relative;
    left:-0.25vw;
    top:-1.4vh;
`

export default CartItem;