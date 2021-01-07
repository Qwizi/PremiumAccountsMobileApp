import React, {useEffect, Fragment} from 'react';
import { StyleSheet} from 'react-native';
import {Button, Card, Icon, Layout, Spinner, Text, TopNavigation, TopNavigationAction} from "@ui-kitten/components";

export default function ThreadDetailScreen(props: any) {
    useEffect(() => {
        console.log(props);
        if (props.route.params == undefined) {
            props.navigation.navigate("Wyszukiwanie")
        }
    }, [props]);

    const BackIcon = (props: any) => (
        <Icon {...props} name='arrow-back'/>
    );

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => props.navigation.navigate('Wyszukiwanie')}/>
    );

    if (!props.route || !props.route.params || !props.route.params.thread) {
        return <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Spinner/></Layout>
    }

    return (
        <Fragment>
            <TopNavigation
                accessoryLeft={BackAction}
                title={props.route.params.thread.title}
            />
            <Layout style={styles.container}>
                <Card style={{width: '100%', marginBottom: '5px'}} status={"success"}>
                    <Text category={'p1'}>{props.route.params.thread.content_html}</Text>
                    <Layout style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5}}>
                        <Button
                            style={styles.button}
                            status={"success"}
                            accessoryRight={(props) => <Icon {...props} name={'star'}/>}
                            size={'small'}
                        />
                        <Button
                            style={styles.button}
                            status={"danger"}
                            accessoryRight={(props) => <Icon {...props} name={'alert-triangle-outline'}/>}
                            size={'small'}
                        />
                    </Layout>
                </Card>
            </Layout>
        </Fragment>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        flex: 1
    },
    button: {
        margin: 2,
    },
});