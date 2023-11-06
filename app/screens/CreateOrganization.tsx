import { StyleSheet, Image, View, Text, ScrollView, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StatusBarComponent from '../components/StatusBarComponent'
import { Avatar, Button, Chip, Divider, Modal, PaperProvider, Portal, TextInput } from 'react-native-paper'
import { Colors, fonts, s } from '../constants/styles'
import { Shadow } from 'react-native-shadow-2'
import { IconButton } from 'react-native-paper'
import { Icon } from '@rneui/themed'
import StylishCard1 from '../components/StylishCard1'
import PressableComponent from '../components/PressableComponent'
import ButtonPressable from '../components/ButtonPressable'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCreateOrgMutation, useGetAllUsersMutation } from '../store/RTKQuery'
import { FlatList } from 'react-native'
import ProfileAvatar from '../components/ProfileAvatar'
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer'
import { IFile, Screens, addUniqueToArray } from '../utils'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import FileUploadItem from '../components/FileUploadItem'
import { useAppSelector } from '../store'
import { HomeRoutes } from '../stacks/HomeStack'

interface CreateOrganizationProp {
    navigation: NativeStackNavigationProp<{}>
}
interface ITempUser {
    _id: string,
    name: string
}
const CreateOrganization = ({ navigation }: CreateOrganizationProp) => {
    interface ChipItem {
        label: string,
        color: string,
        onClose: boolean
    }
    const [orgInfo, setOrgInfo] = useState<{ name: string, desc: string }>({ name: 'Org1', desc: 'Org2 Desc' });
    const [selectedAdmins, setSelectedAdmins] = useState<ITempUser[]>([]);
    const [selectedPics, setSelectedPics] = useState<IFile[]>([]);
    const [selectedLogo, setSelectedLogo] = useState<any>();
    const [groupList, setGroupList] = useState<ChipItem[]>([
        { label: 'General', color: Colors.pallette3.primaryLight, onClose: true },
        { label: 'Announcements', color: Colors.pallette3.primaryLight, onClose: true },
        { label: 'Q & A', color: Colors.pallette3.primaryLight, onClose: true },
        { label: 'Verification', color: Colors.pallette3.primaryLight, onClose: true },
        { label: 'Resources', color: Colors.pallette3.primaryLight, onClose: true },
        { label: 'Staff Room', color: Colors.pallette3.c1, onClose: false },
        { label: 'Admin Room', color: Colors.pallette3.c2, onClose: false },
        { label: 'Council Room', color: Colors.pallette3.c3, onClose: false },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [createOrgReq, createOrgResp] = useCreateOrgMutation();
    const [groupName, setGroupName] = useState('')
    const [filesUploaded, setFilesUploaded] = useState(true)
    const [logoUploaded, setUploadedLogo] = useState(undefined);
    const [getUsersReq, getUsersResp] = useGetAllUsersMutation();
    const [bannerPicsUploaded, setBannerPicsUploaded] = useState<string[]>([]);
    const files = useAppSelector(state => state.reducer.filesHolder)


    const styles = StyleSheet.create({
        imageBackground: {
            height: '100%', width: '100%', position: 'absolute'
        },
        modalContainerStyle: {
            marginHorizontal: '4%',
            backgroundColor: 'white',
            paddingVertical: 20,
            borderRadius: 14,
            display: 'flex',

        },
        mainView: {
            height: '100%', width: '100%', display: 'flex'
        },
        headerViewStyle: { display: 'flex', flexDirection: 'row', padding: 14, alignItems: 'center' }
    })

    useEffect(() => {
        // if (selectedPics.length == bannerPicsUploaded.length) {
        //     setFilesUploaded(true)
        // }
        if (getUsersResp.isUninitialized) {
            getUsersReq({ limit: 20 })
        }

    }, [getUsersResp, bannerPicsUploaded])

    useEffect(() => {
        if (createOrgResp.isSuccess) {
            // Show Success Modal
            setOrgInfo({ name: '', desc: '' })
            setSelectedAdmins([])
            setSelectedPics([])
            setSelectedLogo(undefined)
            setBannerPicsUploaded([])
            navigation.navigate(HomeRoutes.Dashboard)
        }
    }, [createOrgResp])

    const removeAdmin = async (admin: ITempUser) => {
        var temp: ITempUser[] = selectedAdmins;
        Object.values(temp).map((item, index) => {
            if (item._id == admin._id) {
                temp.splice(index, 1)
                setSelectedAdmins([...temp])
            }
        })
    }

    const removeGroup = async (groupName: string) => {
        Object.values(groupList).map((item: ChipItem, index: number) => {
            if (item.label == groupName) {
                groupList.splice(index, 1)
                setGroupList([...groupList])
            }
        })
    }

    const addGroup = () => {
        // groupList.push()
        setGroupList([{ color: Colors.pallette3.primaryLight, label: groupName, onClose: true }, ...groupList])
        setGroupName('')
    }

    const handleChange = (label: string, text: string) => {
        setOrgInfo({ ...orgInfo, [label]: text })
    }

    const createOrg = () => {
        let groups = []
        for (let group of groupList) {
            groups.push(group.label)
        }
        if (selectedPics.length == bannerPicsUploaded.length) {
            createOrgReq({ name: orgInfo.name, desc: orgInfo.desc, admins: selectedAdmins, groups: groups, files: bannerPicsUploaded, logo: logoUploaded })
        }
    }

    const pickImages = async () => {
        const res: DocumentPickerResponse[] = await DocumentPicker.pick({
            type: DocumentPicker.types.images,
            allowMultiSelection: true
        })
        let temp: IFile[] = []
        res.forEach((file) => {
            temp.push({ name: file.name as string, size: file.size as number, type: file.type as string, uri: file.uri })
        })
        if (res.length != 0) setFilesUploaded(false)
        setSelectedPics(temp);
    }

    const pickLogo = async () => {
        const res: DocumentPickerResponse[] = await DocumentPicker.pick({
            type: DocumentPicker.types.images,
            allowMultiSelection: false
        })
        let logoImg: DocumentPickerResponse = res[0]
        let temp: IFile = { name: logoImg.name as string, type: logoImg.type as string, size: logoImg.size as number, uri: logoImg.uri }
        setSelectedLogo(temp)
    }

    const uploadLogo = async (data: any) => {
        setUploadedLogo(data._id)
    }

    const uploadBannerPic = async (data: any) => {
        setBannerPicsUploaded([...bannerPicsUploaded, data._id])
    }

    const ModalView = () => {
        return <>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '4%' }}>
                <Text style={fonts.head2}>Add Admins</Text>
                <Pressable onPress={() => { setShowModal(false) }} android_ripple={{ color: 'rgba(0,0,0,0.1)', foreground: true }} style={{ padding: 10, borderRadius: 100, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/Multiply.png')} style={{ height: 20, width: 20 }} />
                </Pressable>
            </View>
            <View style={{ marginHorizontal: '4%' }}>
                <TextInput placeholder='Search Admin' placeholderTextColor={'#B7B7B7'} right={<TextInput.Icon iconColor='#B7B7B7' icon={'magnify'} />} mode='outlined' style={{ borderRadius: 14, backgroundColor: '#F5F5F5' }} outlineStyle={{ borderWidth: 0, borderRadius: 10 }} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: '4%', marginTop: 14 }}>
                {
                    Object.values(selectedAdmins).map((admin: ITempUser) => {
                        return (
                            <View key={admin._id} style={{ position: 'relative' }}>
                                <View style={{ position: 'absolute', zIndex: 3, right: 0, top: 0 }}>
                                    <PressableComponent onClick={() => {
                                        removeAdmin(admin)
                                    }} foreground={true} rippleColor='light' style={{ borderRadius: 100, overflow: 'hidden' }}>
                                        <Avatar.Icon size={20} icon={'window-close'} style={{ backgroundColor: 'red' }} />
                                    </PressableComponent>
                                </View>
                                <ProfileAvatar size={50} userId={admin._id} userName={admin.name} />
                            </View>
                        )
                    })
                }
            </View>

            <View style={{ minHeight: 100, maxHeight: 300, marginTop: 14 }}>
                {
                    getUsersResp.isSuccess &&
                    <FlatList
                        renderItem={({ index, item }) => {
                            return (
                                <PressableComponent style={{ marginHorizontal: 14, borderRadius: 10, overflow: 'hidden', marginTop: (index == 0 ? 0 : 14) }} foreground={true} rippleColor='dark' onClick={() => {
                                    let temp: ITempUser[] = [...selectedAdmins];
                                    temp = addUniqueToArray(temp, '_id', { _id: item._id, name: item.name })
                                    if (JSON.stringify(temp) !== JSON.stringify(selectedAdmins)) {
                                        setSelectedAdmins([...temp])
                                    }
                                }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', borderRadius: 6 }}>
                                        <View>
                                            <ProfileAvatar userName={item.name} userId={item._id} size={40} />
                                        </View>
                                        <View style={{ paddingVertical: 8, marginLeft: 14, display: 'flex', justifyContent: 'space-between' }}>
                                            <Text style={fonts.head3}>{item.name}</Text>
                                            <Text style={{}}>{item.email}</Text>
                                        </View>
                                    </View>
                                </PressableComponent>
                            )
                        }}
                        onEndReachedThreshold={0.9}
                        keyExtractor={(user) => user._id}
                        alwaysBounceVertical={true}
                        data={getUsersResp.data}
                        ListEmptyComponent={<View><Text>No Users.</Text></View>} />
                }
            </View>

        </>
    }


    return (
        <>
            <PaperProvider>
                <Portal>
                    <Modal visible={showModal} onDismiss={() => { setShowModal(false) }} contentContainerStyle={styles.modalContainerStyle}>
                        <ModalView />
                    </Modal>
                </Portal>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View>
                        <StatusBarComponent barStyle='dark-content' type='Normal' />
                        <ImageBackground style={styles.imageBackground} source={require('../../assets/images/createOrg_back1.png')} />
                        <SafeAreaView>
                            <View style={styles.mainView}>
                                <View style={styles.headerViewStyle}>
                                    <Pressable onPress={() => { navigation.goBack() }} android_ripple={{ color: 'rgba(0,0,0,0.1)', foreground: true }} style={{ padding: 10, borderRadius: 100, overflow: 'hidden' }}>
                                        <Image source={require('../../assets/images/back_icon.png')} style={{ height: 20, width: 20 }} />
                                    </Pressable>
                                    <View style={{ marginLeft: 14 }}>
                                        <Text style={fonts.head2}>Create Organization</Text>
                                    </View>
                                </View>
                                <Divider />
                                <View style={{ paddingHorizontal: 14, marginTop: 20 }}>
                                    <TextInput onChangeText={(text) => { handleChange('name', text) }} value={orgInfo.name} label='Enter Organization Name' outlineStyle={{ borderRadius: 8 }} mode='outlined' outlineColor={Colors.pallette3.primary} activeOutlineColor={Colors.pallette3.primary} />
                                    {/* <TextInput style={{ height: 150, display: 'flex', marginTop: 20 }} placeholder='Tell us more about your organization.' multiline={true} label='Enter Description' mode='outlined' outlineColor={Colors.pallette3.primary} activeOutlineColor={Colors.pallette3.primary} /> */}
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        label='Enter Description'
                                        value={orgInfo.desc}
                                        placeholder='Tell us more about your organization.'
                                        placeholderTextColor={'grey'}
                                        mode='outlined'
                                        style={{ marginTop: 14 }}
                                        outlineStyle={{ borderRadius: 8 }}
                                        outlineColor={Colors.pallette3.primary}
                                        activeOutlineColor={Colors.pallette3.primary}
                                        onChangeText={(text) => { handleChange('desc', text) }}
                                    />
                                </View>
                                <Divider />
                                <View style={{ paddingHorizontal: 14, marginTop: 20 }}>
                                    <Text style={[fonts.head2]}>Default Groups/Rooms</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 14, marginTop: 20 }}>
                                    <StylishCard1 backgroundColor={Colors.pallette3.c1} bottomText='public' centerImage={<Image style={{ height: 50, width: 50 }} source={require('../../assets/images/Staff.png')} />} text='Staff Room' />
                                    <StylishCard1 style={{ marginHorizontal: 14 }} backgroundColor={Colors.pallette3.c2} bottomText='admin' centerImage={<Image style={{ height: 50, width: 50 }} source={require('../../assets/images/admin_icon.png')} />} text='Admin Room' />
                                    <StylishCard1 backgroundColor={Colors.pallette3.c3} bottomText='council' centerImage={<Image style={{ height: 50, width: 50 }} source={require('../../assets/images/parliament_icon.png')} />} text='Council Room' />
                                </View>
                                <View style={{ paddingHorizontal: 14, marginTop: 20 }}>
                                    <Text style={[fonts.head2]}>Add More Groups/Rooms</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 14 }}>
                                        <View style={{ flexGrow: 6 }}>
                                            <TextInput onChangeText={newText => setGroupName(newText)} value={groupName} mode='outlined' label={'Enter Name'} outlineColor={Colors.pallette3.primary} activeOutlineColor={Colors.pallette3.primary} />
                                        </View>
                                        <View style={{ flexGrow: 1 }}>
                                            <ButtonPressable onPress={addGroup} text='Add' buttonStyle={{ flex: 1 }} />
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {
                                            Object.values(groupList).map((listItem: ChipItem) => {
                                                let attr: any = { textColor: 'white' }
                                                if (listItem.onClose) {
                                                    attr.onClose = () => {
                                                        removeGroup(listItem.label)
                                                    }
                                                    attr.textColor = 'black'
                                                }
                                                return (
                                                    <View key={listItem.label} style={{ elevation: 14, marginTop: 14, marginRight: 14 }}>
                                                        <Chip elevated={true} {...attr} style={{ backgroundColor: listItem.color, borderRadius: 100 }}>
                                                            <Text style={{ color: attr.textColor }}>{listItem.label}</Text>
                                                        </Chip>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={{ display: 'flex', marginTop: 20 }}>
                                        <Text style={[fonts.head2]}>Add More Groups/Rooms</Text>
                                        <Button onPress={() => { setShowModal(true) }} style={{ backgroundColor: Colors.pallette3.primary, borderRadius: 5, marginTop: 14 }} mode='contained'>
                                            Add Admins
                                        </Button>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {
                                            Object.values(selectedAdmins).map((admin: ITempUser) => {
                                                return (
                                                    <View style={{ elevation: 14, marginTop: 14, marginRight: 14 }}>
                                                        <Chip onClose={() => { removeAdmin(admin) }} elevated={true} style={{ backgroundColor: 'white', borderRadius: 100 }}>
                                                            <Text style={{ color: 'black' }}>{admin.name}</Text>
                                                        </Chip>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={[fonts.head2]}>Add Pictures</Text>
                                        <ScrollView contentContainerStyle={{ width: '100%' }} horizontal={true}>
                                            <View style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap', marginTop: 14 }}>
                                                <PressableComponent style={{ marginRight: 10 }} foreground={true} onClick={pickImages}>
                                                    <View style={{ height: 80, width: 80, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#9B9B9B' }}>
                                                        <Avatar.Icon color='#9B9B9B' icon={'plus'} style={{ backgroundColor: 'transparent' }} />
                                                    </View>
                                                </PressableComponent>
                                                {
                                                    Object.values(selectedPics).map((filePic: IFile) => {
                                                        return <FileUploadItem uploadCallback={uploadBannerPic} key={filePic.name} file={filePic} />
                                                        // return (
                                                        //     <View style={{ marginRight: 10, marginBottom: 10 }} key={filePic.uri}>
                                                        //         <Image style={{ height: 80, width: 80 }} source={{ uri: filePic.uri }} />
                                                        //     </View>
                                                        // )
                                                    })
                                                }
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={[fonts.head2]}>Add Logo</Text>
                                        <ScrollView contentContainerStyle={{ width: '100%' }} horizontal={true}>
                                            <View style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap', marginTop: 14 }}>
                                                {
                                                    selectedLogo == undefined &&
                                                    <PressableComponent style={{ marginRight: 10 }} foreground={true} onClick={pickLogo}>
                                                        <View style={{ height: 80, width: 80, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#9B9B9B' }}>
                                                            <Avatar.Icon color='#9B9B9B' icon={'plus'} style={{ backgroundColor: 'transparent' }} />
                                                        </View>
                                                    </PressableComponent>
                                                }
                                                {
                                                    selectedLogo &&
                                                    <FileUploadItem uploadCallback={uploadLogo} key={selectedLogo.name} file={selectedLogo} />
                                                }
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={{ display: 'flex', marginVertical: 20 }}>
                                        {/* <Text>{filesUploaded.toString()}</Text> */}
                                        <ButtonPressable disabled={selectedPics.length != bannerPicsUploaded.length} onPress={createOrg} text='Create Organization' backgroundColor={Colors.pallette3.third} />
                                    </View>
                                </View>
                            </View>
                        </SafeAreaView>
                    </View>
                </ScrollView >
            </PaperProvider >
        </>
    )
}

export default CreateOrganization