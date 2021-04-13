import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';

export default MovieDetails = ({ route, navigation }) => {
    const { id } = route.params;

    const [item, setItem] = useState({});
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        let movie = {}
        fetch('http://www.omdbapi.com/?apikey=5bfe0dc&i=' + id)
            .then(response => response.json())
            .then(data => movie = data)
            // .then(() => setEmpty(false))
            .then(() => {
                if (movie["Response"] == "True") {
                    setItem(movie)
                }
                setLoaded(true);
            })
    }

    const Item = () => {
        const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country,
            Awards, Poster, Ratings, MetaScore, imdbRating, imdbVotes, Type, DVD, Production, Website } = item;

        return (
            <ScrollView style={{ width: '80%', marginBottom: 100 }} showsVerticalScrollIndicator={false}>
                <Image style={{ alignSelf: 'center', width: 200, height: 300 }} source={{ uri: Poster }} />

                <Text style={{ marginTop: 10, fontSize: 30, fontWeight: 'bold' }}>
                    {Title} ({Year})
                </Text>
                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    {Genre}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Runtime: {Runtime}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Rated: {Rated}
                </Text>

                <View style={{ width: '100%', backgroundColor: 'black', height: 1, marginTop: 10 }} />

                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Language: {Language}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Country: {Country}
                </Text>

                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Type: {Type}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Released: {Released}
                </Text>

                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Studio: {Production}
                </Text>

                {Website != "N/A" ?
                    <Text style={{ marginTop: 10, fontSize: 20 }} onPress={() => Linking.openURL(Website)}>
                        Website
                    </Text>
                    :
                    <></>

                }

                <View style={{ width: '100%', backgroundColor: 'black', height: 1, marginTop: 10 }} />
                
                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Awards: {Awards}
                </Text>

                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    MetaScore: {MetaScore}
                </Text>

                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    imdbRating: {imdbRating}
                </Text>

                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    imdbVotes: {imdbVotes}
                </Text>

                <View style={{ width: '100%', backgroundColor: 'black', height: 1, marginTop: 10 }} />

                <Text style={{ marginTop: 10, fontSize: 25, fontWeight: 'bold' }}>
                    Plot
                </Text>
                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    {Plot}
                </Text>

                <View style={{ width: '100%', backgroundColor: 'black', height: 1, marginTop: 10 }} />


                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Directed By: {Director}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Cast: {Actors}
                </Text>

                <Text style={{ marginTop: 10, fontSize: 20 }}>
                    Written By: {Writer}
                </Text>



            </ScrollView>
        )
    }


    return (
        <View style={styles.container}>
            <Item />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
});
