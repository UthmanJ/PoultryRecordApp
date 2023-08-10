import axios from "axios";
axios.default;
import React, { useState, useEffect} from 'react';
import { StyleSheet,TextInput, View, Alert, Button, Text} from 'react-native';

function PoultryDetail({ navigation, route }) {
    const id = route.params.userId;
    const [qtyproduced, setQtyproduced] = useState("")
    const [qtysold, setQtysold] = useState("")
    const [qtydead, setQtydead] = useState("")
    const [breed, setBreed] = useState("")
    const [date, setDate] = useState("")
 

    useEffect(() => {
        getPoultryById();
    }, []);

    const getPoultryById = () => {
        axios.get(`http://192.168.39.23:3000/poultry/get-poultries/${id}`)
        .then(function (response) {
            // handle success
            setQtyproduced(response.data.qtyproduced)
            setQtysold(response.data.qtysold)
            setQtydead(response.data.qtydead)
            setBreed(response.data.breed)
            setDate(response.data.createdAt)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    }

    const updatePoultry = (id) => {
     axios
        .put(`http://192.168.39.23:3000/poultry/update-poultries/${id}`, {
            qtyproduced: qtyproduced,
            qtysold: qtysold,
            qtydead: qtydead,
            breed: breed,
        })
        .then((response) => {
            console.log(response.data)
            Alert.alert("Success!", "Updated Successfully")
            navigation.navigate("PoultryRecord");
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
    const deletePoultry = (id) => {
     axios
        .delete(`http://192.168.39.23:3000/poultry/delete-poultries/${id}`)
        .then(() => {
            Alert.alert("Success!", "Deleted Successfully")
            navigation.navigate("PoultryRecord");
        })
        .catch((error) => console.log(`Error: ${error}`));
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return formattedDate;
      }

return (
    <> 
         <View style={ styles.container }> 
         <Text style={styles.date}>Date:{formatDate(date)}</Text>
         <Text>Quantity Produced:</Text>
            <TextInput
                style={styles.input}
                placeholder='Qty Produced'
                onChangeText={ setQtyproduced }
                value={qtyproduced.toString()}
                keyboardType="phone-pad"
                
            />
             <Text>Quantity Sold:</Text>
             <TextInput
                style={styles.input}
                placeholder='Qty Sold'
                onChangeText={ setQtysold }
                value={ qtysold.toString() }
                keyboardType="phone-pad"
                
            />
             <Text>Quantity Dead:</Text>
             <TextInput
                style={styles.input}
                placeholder='Qty Dead'
                onChangeText={ setQtydead }
                value={ qtydead.toString() }
                keyboardType="phone-pad"
                
            />
             <Text>Breed:</Text>
             <TextInput
                style={styles.input}
                placeholder='Breed'
                onChangeText={ setBreed }
                value={ breed }
                keyboardType="default"
                
            />

        <View style={styles.buttonContainer}>
         <View style={styles.Btn}>
            <Button title="Update Record"  color="green" onPress={() => updatePoultry(id)}/>
          </View>
         <View style={styles.Btn}>
            <Button title="Delete Record"  color="red" onPress={() => deletePoultry(id)}/>
          </View>
         </View>
        </View> 
            
       </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        
    },
    input: {
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 10,
        width: "70%",
        padding: 12,
        marginBottom: 12
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 16
    },

    Btn: {
        width: "35%",
        marginHorizontal: 8
    },
    date:{
       fontSize: 18,
       fontWeight: "bold",
       marginBottom: 20,
       textDecorationLine: "underline"

    }

    
})

export default PoultryDetail;