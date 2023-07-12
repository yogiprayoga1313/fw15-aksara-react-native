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
import {
  actions,
  RichEditor,
  RichToolbar,
  applyFormatWithElement,
  stripHtml,
} from 'react-native-pell-rich-editor';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Feather';

// const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;

const EditEventUser = ({route}) => {
  const {id} = route.params;
  const navigation = useNavigation();
  const [categoriesValue, setcategoriesValue] = React.useState(null);
  const [LocationValue, setLocationValue] = React.useState(null);
  const token = useSelector(state => state.auth.token);
  const [selectedPicure, setSelectedPicture] = React.useState();
  const richText = React.useRef();
  const [openCategories, setOpenCategories] = React.useState(false);
  const [openLocation, setOpenLocation] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState({});
  const [eventView, setEventView] = React.useState({});

  React.useEffect(() => {
    async function getDataEvents() {
      const {data} = await http(token).get(`/events/${id}`);
      setEventView(data.results);
      console.log(data);
    }
    getDataEvents();
  }, [token, setEventView, id]);

  const [categories, setCategories] = React.useState([
    {label: 'Music', value: '9'},
    {label: 'Arts', value: '10'},
    {label: 'Festival', value: '14'},
    {label: 'Workshop', value: '12'},
    {label: 'Sport', value: '13'},
    {label: 'Fashion', value: '15'},
    {label: 'Outdoors', value: '11'},
  ]);
  const [Location, setLocation] = React.useState([
    {label: 'Bandung', value: '31'},
    {label: 'Bali', value: '32'},
    {label: 'Aceh', value: '33'},
    {label: 'Solo', value: '34'},
    {label: 'Yogyakarta', value: '35'},
    {label: 'Semarang', value: '36'},
    {label: 'Cilacap', value: '30'},
    {label: 'Jakarta', value: '37'},
  ]);

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

  const createEvent = async values => {
    const form = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key] || key === 'descriptions') {
        form.append(key, values[key]);
      }
    });

    if (selectedPicure) {
      form.append('picture', selectedPicure);
    }
    if (date) {
      form.append('date', moment(date).format('YYYY-MM-DD'));
    }
    if (categoriesValue) {
      form.append('categoriesId', categoriesValue);
    }
    if (LocationValue) {
      form.append('cityId', LocationValue);
    }
    const {data} = await http(token).patch(`/events/manage/${id}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigation.navigate('ManageEvent');
    console.log(data);
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
            title: eventView?.title,
            cityId: '',
            date: '',
            descriptions: eventView?.descriptions,
            categoriesId: '',
          }}
          onSubmit={createEvent}
          enableReinitialize>
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
                  ) : eventView.picture ? (
                    <Image
                      style={style.imagesEvents}
                      source={{uri: eventView.picture}}
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
                  name="title"
                  style={style.placeholder}
                  placeholder="Input Your Event Title..."
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                />
              </View>
              <View style={style.titleContText}>
                <Text style={style.contTitle}>Location</Text>
                <DropDownPicker
                  placeholder="Select Location"
                  open={openLocation}
                  value={LocationValue}
                  items={Location}
                  setOpen={setOpenLocation}
                  setValue={setLocationValue}
                  onChangeValue={handleChange('location')}
                  setItems={setLocation}
                  zIndex={1001}
                  listMode="SCROLLVIEW"
                />
              </View>
              <View style={style.titleContText}>
                <Text style={style.contTitle}>Category</Text>
                <DropDownPicker
                  placeholder="Select Categories"
                  open={openCategories}
                  value={categoriesValue}
                  items={categories}
                  setOpen={setOpenCategories}
                  setValue={setcategoriesValue}
                  onChangeValue={handleChange('categories')}
                  setItems={setCategories}
                  zIndex={1001}
                  listMode="SCROLLVIEW"
                />
              </View>
              <View style={style.titleContText}>
                <Text style={style.contTitle}>Date</Text>
                <View style={style.textBetween}>
                  <View>
                    <Text style={style.DateWrapper}>
                      {date ? moment(date).format('YYYY-MM-DD') : ''}
                    </Text>
                  </View>
                  <DatePicker
                    modal
                    open={open}
                    mode="date"
                    date={date}
                    // value={values.date}
                    onConfirm={newDate => {
                      setOpen(false);
                      setDate(newDate);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                  <View>
                    <Icon
                      style={style.EditBtnStyle}
                      onPress={() => setOpen(true)}
                      name="edit"
                      size={30}
                    />
                  </View>
                </View>
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
                        const htmlContent = descriptionText.replace(
                          /<\/?div>/g,
                          '',
                        );
                        handleChange('descriptions')(htmlContent);
                        // console.log('descriptionText:', descriptionText);
                      }}
                      customCSS={`* {
                        font-family: Arial, sans-serif; /* Specify the desired font family */
                      }`}
                      customCSSMap={{
                        // Map the custom CSS for each formatting action
                        [actions.setBold]: 'font-weight: bold;',
                        [actions.setItalic]: 'font-style: italic;',
                      }}
                      editorInitializedCallback={() => {
                        // Set the initial formatting
                        richText.current?.setContentHTML('<div></div>');
                      }}
                      pasteAsPlainText={true}
                      onMessage={event => {
                        const {data} = event.nativeEvent;
                        if (data === 'customAction_Bold') {
                          applyFormatWithElement('bold');
                        } else if (data === 'customAction_Italic') {
                          applyFormatWithElement('italic');
                        }
                      }}
                    />
                  </KeyboardAvoidingView>
                </ScrollView>

                {/* <RichToolbar
                  editor={richText}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.heading1,
                  ]}
                  iconMap={{[actions.heading1]: handleHead}}
                /> */}
              </SafeAreaView>
              <TouchableOpacity
                style={style.createButton}
                onPress={handleSubmit}>
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
  DateWrapper: {
    fontSize: 20,
  },
  EditBtnStyle: {
    color: 'blue',
  },
  textBetween: {
    // flexDirection: 'row',
    gap: 10,
  },
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
    // flexDirection: 'row',
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

export default EditEventUser;
