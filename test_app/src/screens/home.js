import React, { useState,useEffect } from 'react';
import {Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import EllipsisText from "react-ellipsis-text";




const Home = ()=>{

    const [data,setData]=useState([])
    const [searchText,setSearchText]=useState("")

    console.log(searchText,"search")

    useEffect(()=>{
        fetch("https://fakestoreapi.com/products/")
        .then((res)=>res.json())
        .then((e)=>setData(e))
    },[])

    const handleSubmit = () =>{
        setData(data.filter((e)=>e.title.toLowerCase().indexOf(searchText)!==-1));
        setSearchText ("")

    }

    


    return(
        <Grid>
            <h1 style={{textAlign:'center'}}>Welcome</h1>
            <Grid style={{display:'flex',alignItems:'center',margin:20,justifyContent:'center',flexDirection:'row'}}>
                <TextField  
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    id="outlined-basic" 
                    type="text"  
                    size="medium" 
                    placeholder="Search..."  
                    style={{width:400}} 
                />

                    <Button  
                        onClick={handleSubmit}
                        variant="contained"
                        style={{textDecoration: 'none',marginLeft:30}}>
                        Submit
                    </Button>
            </Grid>
            {data.length>0
            ?
            <Grid style={{display:'flex',flexDirection:'row',flexWrap:'wrap',margin:20,paddingLeft:100}}>
            {data.map((item)=>{
                return(
                <Card style={{width:500,margin:20}}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={item.title}
                    subheader={item.category}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={item.image}
                    alt="Paella dish"
                />
                <CardContent>
                    <EllipsisText text={item.description} length={"100"} />
                </CardContent>
                </Card>
                )
            })}
        </Grid>
        :
        <h1 style={{textAlign:'center',paddingTop:100}}>No items found</h1>}
        </Grid>
    )
}

export default Home;