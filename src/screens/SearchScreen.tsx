import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Input, Layout, List, ListItem, Text, Divider} from "@ui-kitten/components";
import api from "../Api";


export default function SearchScreen(props: any) {
    const [searchValue, setSearchValue] = useState('');
    const [threads, setThreads] = useState<object[] | []>([])

    // @ts-ignore
    const renderItem = ({ item, index }) => (
        <ListItem
            key={index}
            title={`${item.title}`}
            description={`${item.updatedAt}`}
        />
    );

    async function handleClickSearchBtn() {
        if (searchValue != '') {
            try {
                setThreads([])
                const response = await api.searchThread(searchValue);
                if (response.status === 200) {
                    setThreads(response.data);
                }
                console.log(response);
            } catch (e) {
                console.log(e);
            }
        } else {
            setThreads([])
        }
    }

    function handleChangeSearchInputText(nextValue: string) {
        setSearchValue(nextValue)
    }

    let listThreads;

    if (threads.length > 0) {
        listThreads = (<List
            data={threads}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
        />)
    }

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text category='h1'> Szukaj kont</Text>
            <Input
                placeholder={'Wyszukaj konto'}
                value={searchValue}
                size='large'
                onChangeText={nextValue => handleChangeSearchInputText(nextValue)}
            />
            <Button
                onPress={handleClickSearchBtn}
            >Wyszukaj</Button>
            {listThreads}
        </Layout>
    )
}