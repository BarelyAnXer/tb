import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const customMarkedDates = {
        '2023-10-20': { selected: true, selectedColor: 'blue' },
        '2023-10-25': { customStyles: { container: { backgroundColor: 'green' } } },
    };


    return (
        <View>
            <Calendar
                // Configure your calendar here
                markedDates={customMarkedDates}
                onDayPress={(day) => {
                    toggleModal();
                }}
            />
            {/* <Modal isVisible={isModalVisible}>
                <View>
                    <Text>This is your modal content</Text>
                    <TouchableOpacity onPress={toggleModal}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal> */}
        </View>
    )
}

export default CalendarScreen

const styles = StyleSheet.create({})