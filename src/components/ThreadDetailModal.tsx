import React from 'react';
import {StyleSheet,} from 'react-native';
import {Button, Card, Divider, Layout, Modal, Text} from "@ui-kitten/components";

export default function ThreadDetailModal(props: any) {
    return (
        <Modal
            visible={props.threadDetailModalVisible}
            style={styles.modal}
        >
            <Card>
                <Text category='h2'>{props.thread.title}</Text>

                <Text category={'p'}>{props.thread.content_html}</Text>
                <Button onPress={() => props.setThreadDetailModalVisible(false)}>
                    Zamknij
                </Button>
            </Card>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        minHeight: '100vh',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
});