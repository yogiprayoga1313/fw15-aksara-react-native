import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import IconPass from 'react-native-vector-icons/Feather';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CameraIcon from 'react-native-vector-icons/Entypo';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import DropDownPicker from 'react-native-dropdown-picker';

const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;

const categories = [
  {label: 'Outdoors', value: 'Outdors'},
  {label: 'Music', value: 'Music'},
  {label: 'Arts', value: 'Arts'},
  {label: 'Festival', value: 'Festival'},
  {label: 'Fashion', value: 'Fashion'},
  {label: 'Sport', value: 'Sport'},
  {label: 'Workshop', value: 'Workshop'},
];

const CreateEvent = () => {
  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = React.useState('Music');
  const token = useSelector(state => state.auth.token);
  const [selectedPicure, setSelectedPicture] = React.useState();
  const richText = React.useRef();

  const handleCategoryChange = itemValue => {
    setSelectedCategories(itemValue);
  };

  const getImage = async source => {
    let results;
    if (!source) {
      results = await launchImageLibrary();
    } else {
      results = await launchCamera({
        quality: 0.5,
      });
    }
    const data = results.assets[0];
    console.log(data);
    if (data.uri) {
      setSelectedPicture({
        name: data.fileName,
        type: data.type,
        uri:
          Platform.OS === 'android'
            ? data.uri
            : data.uri.replace('file://', ''),
      });
    }
  };

  return (
    <ScrollView style={style.contianerMain}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ManageEvent')}>
          <IconPass name="arrow-left" size={35} color="black" />
        </TouchableOpacity>
        <Text style={style.textHeader}>Create Event</Text>
      </View>
      <View style={style.containerSec}>
        <Formik
          initialValues={{
            title: '',
            cityId: '',
            date: '',
            descriptions: '',
            categoriesId: '',
          }}>
          {({handleSubmit, handleChange, handleBlur, errors, values}) => (
            <>
              <View style={style.titleContText}>
                <Text style={style.contTitle}>Event Picture</Text>
                <View style={style.picCont}>
                  {selectedPicure ? (
                    <Image
                      style={style.imagesEvents}
                      src={selectedPicure.uri}
                    />
                  ) : (
                    <Text style={style.noImagesText}>No Images</Text>
                  )}
                  <TouchableOpacity
                    onPress={() => getImage()}
                    style={style.cameraIcon}>
                    <CameraIcon name="camera" size={40} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={style.titleContText}>
                <Text style={style.contTitle}>Event Name</Text>
                <TextInput
                  style={style.placeholder}
                  placeholder="Input Your Event Title..."
                  onChangeText={handleChange('Title')}
                />
              </View>
              <View style={style.titleContText}>
                <Text style={style.contTitle}>Location</Text>
              </View>
              <View style={style.titleContText}>
                <Text style={style.contTitle}>Category</Text>
                <DropDownPicker
                  items={categories}
                  defaultValue={selectedCategories}
                  containerStyle={style.dropdownContainer}
                  style={style.dropdown}
                  itemStyle={style.dropdownItem}
                  dropDownStyle={style.dropdownMenu}
                  onChangeItem={item => handleCategoryChange(item.value)}
                />
              </View>
              <View style={style.titleContText}>
                <Text style={style.contTitle}>Date</Text>
              </View>
              <View style={style.titleContText}>
                <Text style={style.contTitle}>Descriptions</Text>
              </View>
              <SafeAreaView>
                <ScrollView>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{flex: 1}}>
                    <Text>Description:</Text>
                    <RichEditor
                      ref={richText}
                      onChange={descriptionText => {
                        console.log('descriptionText:', descriptionText);
                      }}
                    />
                  </KeyboardAvoidingView>
                </ScrollView>

                <RichToolbar
                  editor={richText}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.heading1,
                  ]}
                  iconMap={{[actions.heading1]: handleHead}}
                />
              </SafeAreaView>
              <TouchableOpacity style={style.createButton}>
                <Text style={style.textButton}>Save</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  dropdownContainer: {
    height: 40,
    width: '100%',
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownMenu: {
    backgroundColor: '#fafafa',
    marginTop: 8,
  },
  contianerMain: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    marginLeft: 90,
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerSec: {
    gap: 30,
    marginTop: 30,
  },
  titleContText: {
    gap: 20,
  },
  picCont: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 20,
  },
  imagesEvents: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'white',
    // objectFit: 'cover',
  },
  imagesEventsIcon: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  cameraIcon: {
    margin: 20,
  },
  noImagesText: {
    margin: 40,
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20,
  },
  createButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#76BA99',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  placeholder: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    height: 60,
  },
});

export default CreateEvent;
