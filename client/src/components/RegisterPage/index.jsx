import { useState } from 'react';

import {
    NavLink
  } from "react-router-dom";

import styled from 'styled-components';
import logo from '../../assets/img/logo1.png';
import banner from '../../assets/img/Profile.png';
import { RiMailFill,RiLockPasswordFill} from 'react-icons/ri';
import { FaUserAlt} from 'react-icons/fa';
import { MdVisibility,MdVisibilityOff} from 'react-icons/md';

const Container = styled.div`
@media(max-width: 900px)
{
    &{
        width: 80%;
        top:0;
        right: 0;
        height: 100%;
        border-radius: 0;
        padding: 0;
    }
}
    position: relative;
    right: -40%;
    top: 10px;
    background-color: #f8f8f8;
    width: 80%;
    height: 100%;
    border-radius: 5em;
    display: flex;
    flex-direction: column;
    padding: 10%;
    z-index: 3;
`;
const Logo = styled.div`
    display: flex;
    margin: 45px auto;
    & img{
        width: 350px;
        margin: 0px 60px;
    }
    @media(max-width: 500px)
    {
        & img{
            width: 80%;
        }
    }
`;
const FormContainer = styled.div`
@media(max-width: 900px)
{
    &{
        width: 100%;
    }
    &>span{
        width: 60%;
    }
}
@media(min-width: 900px)
{
    & .visibility{
        left: 310px;
    }
}
@media(min-width: 500px) and (max-width: 900px)
{
    & .visibility{
        left: 120%;
    }
}
@media(max-width: 500px)
{
    & .visibility{
        left: 120%;
    }
}
   display:flex;
   flex-direction:column;
   justify-content: center;
   width: 300px;
   heigth:auto;
   & span{
       margin-left: 50px;
   }
   & .visibility{
       margin: 0px;
   }
`;
const Title = styled.div`
    color: #336699;
    font-size: 24px;
    font-weight: bold;
    padding: 10px 75px;
    @media(max-width: 900px)
    {
        &{
            font-size: 
        }
    }
`;
const InputForm = styled.input`
    padding: 5px;
    color: #808080;
    border: 1px solid #336699;
    border-radius: 12px;
    outline: none;
    width: 100%;
    padding: 13px 45px; 
    
`;
const SpanForm = styled.div`
    color: #336699;
    margin: 5px 70px;
    width: 100%;
    display: flex;
    align-items: baseline;
    @media(max-width: 330px)
{
    &{
        flex-direction: column;
        justify-content: left;
    }
}
`;
const Button = styled.button`
    background-color: #336699;
    color: #f8f8f8;
    margin: 15px 10px;
    border: none;
    border-radius: 12px; 
    padding: 12px 15px;
    width: auto;
    &:hover{
        opacity:0.8;
    }
`;
const Banner = styled.div`
@media(max-width: 900px)
{
    &{
        display: none;
    }
}
    position: absolute;
    top: 30px;
    color: #f8f8f8;
    z-index: 5;
    & span{
        position: relative;
        top: 50px;
        left: calc(5vw);
        font-weight: bold;
        font-size: 36px;
    }
    & p{
        position: relative;
        top: 40px;
        left: calc(5vw);
        font-size: 22px;
    }
    & img{
        margin: 60px 30px;
    }
`;
const RegisterPage = () => {

    const [email,setEmail] = useState("");
    const [haslo,setHaslo] = useState("");
    const [phaslo,setPHaslo] = useState("");
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");

    const [visibility,setVisibility] = useState(false);

    const handleSubmit = () =>{
        console.log("Wysłano!")
    }
    return ( 
        <>
        <Banner>
                
            <span>Stwórz swoje konto!</span>
            <p>Wystarczy uzupełnić formularz<br/>rejestracyjny!</p>
                
            <img src={banner} alt="banner" style={{width:"calc(60vw - 180px)"}}/>
        </Banner>
        <Container>
            <FormContainer>
                <Logo>
                    <img src={logo} alt="logo"/>
                </Logo>
                <Title>Rejestracja</Title>
                <span>
                    <FaUserAlt 
                        color={"gray"} 
                        size={"16px"} 
                        style={{position: 'relative', left: '20px',top: '33px'}}/>
                    <InputForm 
                        placeholder="Imię" 
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </span>
                <span>
                    <FaUserAlt
                        color={"gray"} 
                        size={"16px"} 
                        style={{position: 'relative', left: '20px',top: '33px'}}/>
                    <InputForm 
                        placeholder="Nazwisko" 
                        type="text"
                        value={surname}
                        onChange={(e)=>setSurname(e.target.value)}
                    />
                </span>
                <span>
                    <RiMailFill 
                        color={"gray"} 
                        size={"16px"} 
                        style={{position: 'relative', left: '20px',top: '33px'}}/>
                    <InputForm 
                        placeholder="E-mail" 
                        type="text"
                        maxlength="5"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </span>
                <span>
                    <RiLockPasswordFill 
                        color={"gray"} 
                        size={"16px"} 
                        style={{position: 'relative', left: '20px',top: '33px'}}/>
                    <InputForm 
                        placeholder="Hasło"
                        type={visibility?"text":"password"}
                        value={haslo}
                        onChange={(e)=>setHaslo(e.target.value)}
                    />
                    {!visibility?
                    <MdVisibility
                        className="visibility"
                        color={"gray"} 
                        size={"16px"} 
                        style={{position: 'relative',top: '-30px'}}
                        onClick={()=>setVisibility(!visibility)}
                    />:
                    <MdVisibilityOff
                        className="visibility"  
                        color={"gray"} 
                        size={"16px"} 
                        style={{position: 'relative',top: '-30px'}}
                        onClick={()=>setVisibility(!visibility)}
                    />}
                </span>
                <span
                    style={{
                        marginTop:'-20px'
                    }}
                >
                    <RiLockPasswordFill 
                        color={"gray"} 
                        size={"16px"} 
                        style={{position: 'relative', left: '20px',top: '33px'}}/>
                    <InputForm 
                        placeholder="Powtórz hasło"
                        type={visibility?"text":"password"}
                        value={phaslo}
                        onChange={(e)=>setPHaslo(e.target.value)}
                    />
                    {!visibility?
                    <MdVisibility
                        className="visibility"
                        color={"gray"} 
                        size={"16px"} 
                        style={{position: 'relative',top: '-30px'}}
                        onClick={()=>setVisibility(!visibility)}
                    />:
                    <MdVisibilityOff
                        className="visibility"  
                        color={"gray"} 
                        size={"16px"} 
                        style={{position: 'relative',top: '-30px'}}
                        onClick={()=>setVisibility(!visibility)}
                    />}
                </span>
                <Button 
                    onClick={()=>handleSubmit()}
                    style={
                    {
                        width: '150px',
                        marginLeft:"50px"
                    }}>
                    Zarejestruj
                </Button>
                <SpanForm>
                    Masz już konto?&nbsp;
                    <Button>
                        <NavLink to="/login" 
                        style={{
                            color: '#f8f8f8',
                            textDecoration:"none",
                        }}>Zaloguj się</NavLink>
                    </Button>
                </SpanForm>
            </FormContainer>
        </Container>
        </>
     )
}
 
export default RegisterPage;