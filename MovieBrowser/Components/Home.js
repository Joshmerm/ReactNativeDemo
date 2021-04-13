import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

export default Home = ({navigation}) => {
    const [movieList, setMovieList] = useState([]);
    const [movieListEmpty, setMovieListEmpty] = useState(true);
    let movies = {};
    const [input, setInput] = useState("");
    const [empty, setEmpty] = useState(true);
    const search = (text) => {
        setInput(text);
        if (text == "") setEmpty(true);
        else {
            fetch('http://www.omdbapi.com/?apikey=5bfe0dc&s=' + text)
                .then(response => response.json())
                .then(data => movies = data)
                .then(() => setEmpty(false))
                .then(() => {
                    if (movies["Response"] == "True") {
                        setMovieListEmpty(false);
                        setMovieList(movies.Search);
                    }
                    else {
                        setMovieListEmpty(true);
                        setMovieList([])
                    }
                })
        }
    }


    const movieCard = ({item}) => {
        const {poster, title, type, year} = item;
        console.log("title", title)

        return(
            <View>
                <Text>
                    {title}
                </Text>
            </View>
        )

    }

    const showDetails = (id) => {
        navigation.navigate("MovieDetails", {id: id})
        
    }

    const image = { uri: "https://reactjs.org/logo-og.png" };
    const Item = ({ title, poster, year, id, type }) =>(

        <TouchableOpacity onPress={() => showDetails(id)} activeOpacity={1} style={{width: '80%', alignSelf: 'center', flexDirection: 'row'}}>


            {poster != "N/A" ? 
                <View style={styles.item}>
                <ImageBackground imageStyle={{ borderRadius: 17}} style={styles.image} source={{uri: poster}}>
            </ImageBackground>
            </View>
            : <></>
            
            }
            <View style={styles.info}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {title}
                </Text>
                <Text style={{marginTop: 5}}>
                    {year}
                </Text>
                <Text style={{marginTop: 5}}>
                    {type}
                </Text>

            </View>
        </TouchableOpacity>

        // <View style={styles.item}>
        //   <Text style={styles.title}>{title}</Text>
        // </View>
      );

    const renderItem = ({ item }) => (
        <Item style={{width: '100%'}} year={item.Year} type={item.Type} id={item.imdbID}  title={item.Title} poster={item.Poster} />
    )

    return (
        <View style={styles.container}>
            <TextInput value={input} onChangeText={text => search(text)} style={styles.TextInput} placeholder="Search.." />
            {empty ? <Text>
                Please Type In A Movie Name
            </Text> :
                movieListEmpty ?
                    <Text>
                        Movie List Empty
                </Text> :
                    <FlatList
                        style={{width: '100%', marginBottom: 30}}
                        showsVerticalScrollIndicator={false}
                        data={movieList}
                        renderItem={renderItem}
                        keyExtractor={item => item.imdbID}
                        
                    />
            }




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // width: '100%',
        // justifyContent: 'center',
    },
    TextInput: {
        marginTop: 30,
        paddingLeft: 20,
        width: '80%',
        height: 50,
        // borderColor: 'black',
        // borderWidth: 1,
        borderRadius: 17,
        backgroundColor: '#E8E8E8'
    },
    submit: {
        width: '60%',
        height: 50,
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        width: '30%',
        height: 200,
        marginTop: 15,
        borderTopLeftRadius: 17,
        borderTopEndRadius: 17,
        resizeMode: 'cover',
        alignSelf: 'center',
        // backgroundColor: 'blue'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        borderRadius: 17,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        // width: '100%',
        height: 100,
        margin: 15,
        top: 0,
        resizeMode: 'cover',
        // alignSelf: 'center',
        // backgroundColor: 'green'
    }
});
