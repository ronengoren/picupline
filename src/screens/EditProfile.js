import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Title, TextInput} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import {useAuth} from '../navigation/AuthProvider';
import Form, {TYPES} from 'react-native-basic-form';
import {Picker} from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import Colors from '../constants/Colors';
import {
  Input,
  Button,
  Card,
  Overlay,
  ListItem,
  CheckBox,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {user as userLocalStorage} from '../infra/localStorage';
export default function EditProfile({navigation, route}) {
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user, updateUser} = useAuth();
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [displayname, setDisplayname] = useState('');
  const [email, setEmail] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [role, setRole] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [relationsipStatus, setrelationsipStatus] = useState('');
  const [location, setLocation] = useState('');
  const [tribes, setTribes] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [hivStatus, setHivStatus] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [diet, setDiet] = useState('');
  const [education, setEducation] = useState('');
  const [kids, setKids] = useState('');
  const [language, setLanguage] = useState('');
  const [music, setMusic] = useState('');
  const [pets, setPets] = useState('');
  const [smoke, setSmoke] = useState('');
  const [sport, setSport] = useState('');
  const [tattoos, setTattoos] = useState('');

  function Height() {
    const options = [];

    for (let i = 100; i < 251; i++) {
      options.push({label: i.toString(), value: i});
    }
    return options;
  }
  function Weight() {
    const options = [];

    for (let i = 40; i < 300; i++) {
      options.push({label: i.toString(), value: i});
    }
    return options;
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const relationshipOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'Single', value: 2},
    {label: 'In A Reletionship', value: 3},
    {label: 'Married', value: 4},
    {label: 'Separated', value: 5},
    {label: 'Divorced', value: 6},
    {label: 'Widowed', value: 7},
    {label: 'In An Open Relationship', value: 8},
    {label: "It's Complicated ", value: 9},
  ];
  const alcoholOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'Frequently', value: 2},
    {label: 'Socially', value: 3},
    {label: 'Never', value: 4},
  ];

  const bodyTypeOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'Thin', value: 2},
    {label: 'Normal', value: 3},
    {label: 'Athletic', value: 4},
    {label: 'Chubby', value: 5},
  ];
  const dietOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'Omnivore', value: 2},
    {label: 'Vegeterian', value: 3},
    {label: 'Vegan', value: 4},
    {label: 'Kosher', value: 5},
    {label: 'Halal', value: 6},
    {label: 'Other', value: 7},
  ];

  const smokeOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'No', value: 2},
    {label: 'Yes, regulary', value: 3},
    {label: 'Sometimes', value: 4},
    {label: 'Only After Sex', value: 5},
  ];

  const sportOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'Active', value: 2},
    {label: 'Sometimes', value: 3},
    {label: 'Almost Never', value: 4},
  ];
  const tattoosOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'None', value: 2},
    {label: 'Many', value: 3},
    {label: 'Some', value: 4},
    {label: 'Only Inconspicuous', value: 5},
  ];
  const lookingForOptions = [
    {label: 'Chat', value: 1},
    {label: 'Dates', value: 2},
    {label: 'Friends', value: 3},
    {label: 'Networking', value: 4},
    {label: 'Right now', value: 5},
    {label: 'Relationship', value: 6},
    {label: 'Open to Everything', value: 7},
  ];
  const educationOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'No Degree', value: 2},
    {label: 'Special School', value: 3},
    {label: 'Some High School', value: 4},
    {label: 'Associate Degree', value: 5},
    {label: 'High School Graduate', value: 6},
    {label: 'Some College Studies', value: 7},
    {label: 'Current College Student', value: 8},
    {label: "Bachelor's Degree", value: 9},
    {label: "Master's Degree", value: 10},
    {label: 'PhD/MD/Post Doctorate', value: 11},
    {label: 'Other', value: 12},
  ];

  const roleOptions = [
    {label: 'Top', value: 1},
    {label: 'Bottom', value: 2},
    {label: 'Vers', value: 3},
  ];
  const kidsOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'Want Someday', value: 2},
    {label: "Don't Want", value: 3},
    {label: 'Have & Want More', value: 4},
    {label: "Have & Don't Want More", value: 5},
  ];
  const LanguageOptions = [
    {label: 'Abkhaz', value: 1},
    {label: 'Afar', value: 2},
    {label: 'Afrikaans', value: 3},
    {label: 'Akan', value: 4},
    {label: 'Albanian', value: 5},
    {label: 'Amharic', value: 6},
    {label: 'Arabic', value: 7},
    {label: 'Aragonese', value: 8},
    {label: 'Armenian', value: 9},
    {label: 'Assamese', value: 10},
    {label: 'Avaric', value: 11},
    {label: 'Avestan', value: 12},
    {label: 'Aymara', value: 13},
    {label: 'Azerbaijani', value: 14},
    {label: 'Bambara', value: 15},
    {label: 'Bashkir', value: 16},
    {label: 'Basque', value: 17},
    {label: 'Belarusian', value: 18},
    {label: 'Bengali', value: 19},
    {label: 'Bihari', value: 20},
    {label: 'Bislama', value: 21},
    {label: 'Bosnian', value: 22},
    {label: 'Breton', value: 23},
    {label: 'Bulgarian', value: 24},
    {label: 'Burmese', value: 25},
    {label: 'Catalan; Valencian', value: 26},
    {label: 'Chamorro', value: 27},
    {label: 'Chechen', value: 28},
    {label: 'Chichewa; Chewa; Nyanja', value: 29},
    {label: 'Chinese', value: 30},
    {label: 'Chuvash', value: 31},
    {label: 'Cornish', value: 32},
    {label: 'Corsican', value: 33},
    {label: 'Cree', value: 34},
    {label: 'Croatian', value: 35},
    {label: 'Czech', value: 36},
    {label: 'Danish', value: 37},
    {label: 'Divehi; Dhivehi; Maldivian;', value: 38},
    {label: 'Dutch', value: 39},
    {label: 'English', value: 40},
    {label: 'Esperanto', value: 41},
    {label: 'Estonian', value: 42},
    {label: 'Ewe', value: 43},
    {label: 'Faroese', value: 44},
    {label: 'Fijian', value: 45},
    {label: 'Finnish', value: 46},
    {label: 'French', value: 47},
    {label: 'Fula; Fulah; Pulaar; Pular', value: 48},
    {label: 'Galician', value: 49},
    {label: 'Georgian', value: 50},
    {label: 'German', value: 51},
    {label: 'Greek, Modern', value: 52},
    {label: 'Guaraní', value: 53},
    {label: 'Gujarati', value: 54},
    {label: 'Haitian; Haitian Creole', value: 55},
    {label: 'Hausa', value: 56},
    {label: 'Hebrew (modern)', value: 57},
    {label: 'Herero', value: 58},
    {label: 'Hindi', value: 59},
    {label: 'Hiri Motu', value: 60},
    {label: 'Hungarian', value: 61},
    {label: 'Interlingua', value: 62},
    {label: 'Indonesian', value: 63},
    {label: 'Interlingue', value: 64},
    {label: 'Irish', value: 65},
    {label: 'Igbo', value: 66},
    {label: 'Inupiaq', value: 67},
    {label: 'Ido', value: 68},
    {label: 'Icelandic', value: 69},
    {label: 'Italian', value: 70},
    {label: 'Inuktitut', value: 71},
    {label: 'Japanese', value: 72},
    {label: 'Javanese', value: 73},
    {label: 'Kalaallisut, Greenlandic', value: 74},
    {label: 'Kannada', value: 75},
    {label: 'Kanuri', value: 76},
    {label: 'Kashmiri', value: 77},
    {label: 'Kazakh', value: 78},
    {label: 'Khmer', value: 79},
    {label: 'Kikuyu, Gikuyu', value: 80},
    {label: 'Kinyarwanda', value: 81},
    {label: 'Kirghiz, Kyrgyz', value: 82},
    {label: 'Komi', value: 83},
    {label: 'Kongo', value: 84},
    {label: 'Korean', value: 85},
    {label: 'Kurdish', value: 86},
    {label: 'Kwanyama, Kuanyama', value: 87},
    {label: 'Latin', value: 88},
    {label: 'Luxembourgish, Letzeburgesch', value: 89},
    {label: 'Luganda', value: 90},
    {label: 'Limburgish, Limburgan, Limburger', value: 91},
    {label: 'Lingala', value: 92},
    {label: 'Lao', value: 93},
    {label: 'Lithuanian', value: 94},
    {label: 'Luba-Katanga', value: 95},
    {label: 'Latvian', value: 96},
    {label: 'Manx', value: 97},
    {label: 'Macedonian', value: 98},
    {label: 'Malagasy', value: 99},
    {label: 'Malay', value: 100},
    {label: 'Malayalam', value: 101},
    {label: 'Maltese', value: 102},
    {label: 'Māori', value: 103},
    {label: 'Marathi (Marāṭhī)', value: 104},
    {label: 'Marshallese', value: 105},
    {label: 'Mongolian', value: 106},
    {label: 'Nauru', value: 107},
    {label: 'Navajo, Navaho', value: 108},
    {label: 'Norwegian Bokmål', value: 109},
    {label: 'North Ndebele', value: 110},
    {label: 'Nepali', value: 111},
    {label: 'Ndonga', value: 112},
    {label: 'Norwegian Nynorsk', value: 113},
    {label: 'Norwegian', value: 114},
    {label: 'Nuosu', value: 115},
    {label: 'South Ndebele', value: 116},
    {label: 'Occitan', value: 117},
    {label: 'Ojibwe, Ojibwa', value: 118},
    {
      label:
        'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic',
      value: 119,
    },
    {label: 'Oromo', value: 120},
    {label: 'Oriya', value: 121},
    {label: 'Ossetian, Ossetic', value: 122},
    {label: 'Panjabi, Punjabi', value: 123},
    {label: 'Pāli', value: 124},
    {label: 'Persian', value: 125},
    {label: 'Polish', value: 126},
    {label: 'Pashto, Pushto', value: 127},
    {label: 'Portuguese', value: 128},
    {label: 'Quechua', value: 129},
    {label: 'Romansh', value: 130},
    {label: 'Kirundi', value: 131},
    {label: 'Romanian, Moldavian, Moldovan', value: 132},
    {label: 'Russian', value: 133},
    {label: 'Sanskrit (Saṁskṛta)', value: 134},
    {label: 'Sardinian', value: 135},
    {label: 'Sindhi', value: 136},
    {label: 'Northern Sami', value: 137},
    {label: 'Samoan', value: 138},
    {label: 'Sango', value: 139},
    {label: 'Serbian', value: 140},
    {label: 'Scottish Gaelic; Gaelic', value: 141},
    {label: 'Shona', value: 142},
    {label: 'Sinhala, Sinhalese', value: 143},
    {label: 'Slovak', value: 144},
    {label: 'Slovene', value: 145},
    {label: 'Somali', value: 146},
    {label: 'Southern Sotho', value: 147},
    {label: 'Spanish; Castilian', value: 148},
    {label: 'Sundanese', value: 149},
    {label: 'Swahili', value: 150},
    {label: 'Swati', value: 151},
    {label: 'Swedish', value: 152},
    {label: 'Tamil', value: 153},
    {label: 'Telugu', value: 154},
    {label: 'Tajik', value: 155},
    {label: 'Thai', value: 156},
    {label: 'Tigrinya', value: 157},
    {label: 'Tibetan Standard, Tibetan, Central', value: 158},
    {label: 'Turkmen', value: 159},
    {label: 'Tagalog', value: 160},
    {label: 'Tswana', value: 161},
    {label: 'Tonga (Tonga Islands)', value: 162},
    {label: 'Turkish', value: 163},
    {label: 'Tsonga', value: 164},
    {label: 'Tatar', value: 165},
    {label: 'Twi', value: 166},
    {label: 'Tahitian', value: 167},
    {label: 'Uighur, Uyghur', value: 168},
    {label: 'Ukrainian', value: 169},
    {label: 'Urdu', value: 170},
    {label: 'Uzbek', value: 171},
    {label: 'Venda', value: 172},
    {label: 'Vietnamese', value: 173},
    {label: 'Volapük', value: 174},
    {label: 'Walloon', value: 175},
    {label: 'Welsh', value: 176},
    {label: 'Wolof', value: 177},
    {label: 'Western Frisian', value: 178},
    {label: 'Xhosa', value: 179},
    {label: 'Yiddish', value: 180},
    {label: 'Yoruba', value: 181},
    {label: 'Zhuang, Chuang', value: 182},
  ];
  const musicOptions = [
    {label: 'Pop', value: 1},
    {label: 'Rock', value: 2},
    {label: 'Hio-Hop', value: 3},
    {label: 'Jazz', value: 4},
    {label: 'R&B', value: 5},
    {label: 'Classical', value: 6},
    {label: 'Electronic/Dance', value: 7},
    {label: 'Country', value: 8},
    {label: 'Metal', value: 9},
  ];
  const petsOptions = [
    {label: 'Ask Me', value: 1},
    {label: 'Dog(s)', value: 2},
    {label: 'Cat(s)', value: 3},
    {label: 'Lots', value: 4},
    {label: 'None', value: 5},
    {label: "Don't Want", value: 6},
  ];
  const hivStatusOptions = [
    {label: 'No Response', value: 1},
    {label: 'Negative', value: 2},
    {label: 'Negative, on Prep', value: 3},
    {label: 'Positive', value: 4},
    {label: 'Positive, undetectable', value: 5},
  ];
  const tribesOptions = [
    {label: 'Bear', value: 1},
    {label: 'Daddy', value: 2},
    {label: 'Discreet, on Prep', value: 3},
    {label: 'Geek', value: 4},
    {label: 'Jock', value: 5},
    {label: 'Leather', value: 6},
    {label: 'Otter', value: 7},
    {label: 'Rugged', value: 8},
    {label: 'Trans', value: 9},
    {label: 'Twink', value: 10},
  ];
  const heightOptions = Height();
  const weightOptions = Weight();
  // console.log(heightOptions);
  React.useEffect(() => {
    if (route.params?.userDetails) {
      // userid = route.params.userDetails;
      // console.log(userid);
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
    if (route.params?.profileImage) {
      // profileImage = route.params.profileImage;
      // console.log(profileImage.uri);
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.userDetails]);

  // useEffect(() => {
  //   return ref.onSnapshot((querySnapshot) => {
  //     const user = [];
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //       const {email, displayName, name} = doc.data();
  //       // console.log(email, displayName, name);
  //       //   list.push({
  //       //     id: doc.id,
  //       //     displayName,
  //       //     email,
  //       //   });
  //     });
  //     // setUsers(list);
  //   });
  // }, []);

  const initialData = {
    displayname: user.displayname,
    // image: route.params.profileImage.uri,
    email: user.email,
    about_me: user.about_me,
    height: user.height,
    weight: user.weight,
    role: user.role,
    bodyType: user.bodyType,
    status: user.status,
    location: user.location,
    tribes: user.tribes,
    lookingFor: user.lookingFor,
    hivStatus: user.hivStatus,
    alcohol: user.alcohol,
    diet: user.diet,
    education: user.education,
    kids: user.kids,
    language: user.language,
    music: user.music,
    pets: user.pets,
    smoke: user.smoke,
    sport: user.sport,
    tattoos: user.tattoos,

    lastTestDate: '2020-04-17T21:00:00.000Z',
    // end_date: '2020-04-17T21:00:00.000Z',
  };

  const fields = [
    {name: 'image', label: 'Profile Image', type: TYPES.Image},
    {
      name: 'displayname',
      label: 'Display Name',

      autoCapitalize: 'none',
      autoCorrect: false,
    },
    // {name: 'email', label: 'Email Address', type: TYPES.Email},
    {name: 'about_me', label: 'About Me', multiline: true},
    {
      name: 'height',
      label: 'Height',

      type: TYPES.Dropdown,

      options: heightOptions,
    },
    {
      name: 'weight',
      label: 'Weight',

      type: TYPES.Dropdown,
      options: weightOptions,
    },
    {
      name: 'role',
      label: 'Role',

      type: TYPES.Dropdown,
      options: roleOptions,
    },
    {
      name: 'bodyType',
      label: 'Body Type',

      type: TYPES.Dropdown,
      options: bodyTypeOptions,
    },

    {
      name: 'status',
      label: 'Status',

      type: TYPES.Dropdown,
      options: relationshipOptions,
    },
    {
      name: 'alcohol',
      label: 'Alcohol',

      type: TYPES.Dropdown,
      options: alcoholOptions,
    },
    {
      name: 'diet',
      label: 'Diet',

      type: TYPES.Dropdown,
      options: dietOptions,
    },
    {
      name: 'education',
      label: 'Education',

      type: TYPES.Dropdown,
      options: educationOptions,
    },
    {
      name: 'kids',
      label: 'Kids',

      type: TYPES.Dropdown,
      options: kidsOptions,
    },
    {
      name: 'language',
      label: 'Language',

      type: TYPES.Dropdown,
      options: LanguageOptions,
    },
    {
      name: 'music',
      label: 'Music',

      type: TYPES.Dropdown,
      options: musicOptions,
    },
    {
      name: 'pets',
      label: 'Pets',

      type: TYPES.Dropdown,
      options: petsOptions,
    },
    {
      name: 'smoke',
      label: 'Smoke',

      type: TYPES.Dropdown,
      options: smokeOptions,
    },
    {
      name: 'sport',
      label: 'Sport',

      type: TYPES.Dropdown,
      options: sportOptions,
    },
    {
      name: 'tattoos',
      label: 'Tattoos',

      type: TYPES.Dropdown,
      options: tattoosOptions,
    },
    {name: 'location', label: 'Location', multiline: true},
    {name: 'tribes', label: 'Tribe', multiline: true},
    {
      name: 'lookingFor',
      label: 'Looking For',

      type: TYPES.Dropdown,

      options: lookingForOptions,
    },
    {
      name: 'hivStatus',
      label: 'HIV Status',

      type: TYPES.Dropdown,

      options: hivStatusOptions,
    },

    [
      //group to appear side by side
      {
        name: 'lastTestDate',
        label: 'Last Tested Date',

        type: TYPES.Date,
      },
      // {name: 'end_date', label: 'END DATE', type: TYPES.Date},
    ],
  ];

  async function onSubmit(data) {
    const updateRef = firestore()
      .collection('Users')
      .doc(user.uid)
      .update(data);
    navigation.goBack();
    setLoading(true);
  }
  async function showImagePicker() {
    try {
      <Picker
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({language: itemValue})
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>;
      // return - cancelled or error or uri
      // return {cancelled:true}
      // return {error:"error message}
      // return {uri:...}
    } catch (e) {
      return {error: e};
    }
  }
  return (
    <View style={styles.viewStyle}>
      <ScrollView>
        <Card>
          <Card.Title>Edit Profile</Card.Title>
          <Card.Divider />
          <Input
            leftIcon={<Icon name="md-person-sharp" size={18} color="black" />}
            placeholder="Display Name"
            onChangeText={function (currentInput) {
              setDisplayname(currentInput);
            }}
          />
          <Card.Divider />

          <Input
            leftIcon={<Icon name="md-person-sharp" size={18} color="black" />}
            placeholder="About Me"
            onChangeText={function (currentInput) {
              setAboutMe(currentInput);
            }}
          />
          <Card.Divider />

          <View>
            <Button
              title={
                height ? 'Height: ' + height.toString() : 'Set your height'
              }
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={height}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setHeight(itemValue)}>
              {heightOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>
          <Card.Divider />

          <View>
            <Button
              title={
                weight ? 'Weight: ' + weight.toString() : 'Set your weight'
              }
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={weight}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setWeight(itemValue)}>
              {weightOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>
          <Card.Divider />
          <View>
            <Button
              title={role ? 'Role: ' + role.toString() : 'Set your Role'}
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={role}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
              {roleOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={
                bodyType
                  ? 'Body Type: ' + bodyType.toString()
                  : 'Set your Body Type'
              }
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={bodyType}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setBodyType(itemValue)}>
              {bodyTypeOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={
                relationsipStatus
                  ? 'Relationship Status: ' + relationsipStatus.toString()
                  : 'Set your Relationship Status'
              }
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={relationsipStatus}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) =>
                setrelationsipStatus(itemValue)
              }>
              {relationshipOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />

          <Input
            leftIcon={<Icon name="md-person-sharp" size={18} color="black" />}
            placeholder="Location"
            onChangeText={function (currentInput) {
              setLocation(currentInput);
            }}
          />
          <Card.Divider />
          <View>
            <Button
              title={tribes ? 'Tribe: ' + tribes.toString() : 'Set your Tribe'}
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={tribes}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setTribes(itemValue)}>
              {tribesOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={
                lookingFor
                  ? 'Looking For: ' + lookingFor.toString()
                  : 'Set What You Looking For'
              }
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={lookingFor}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) =>
                setLookingFor(itemValue)
              }>
              {lookingForOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={
                hivStatus
                  ? 'HIV Status: ' + hivStatus.toString()
                  : 'Set What HIV Status'
              }
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={hivStatus}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setHivStatus(itemValue)}>
              {hivStatusOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={
                alcohol ? 'Alcohol?: ' + alcohol.toString() : 'Set Alcohol'
              }
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={alcohol}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setAlcohol(itemValue)}>
              {alcoholOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={diet ? 'Diet?: ' + diet.toString() : 'Set Diet'}
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={diet}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setDiet(itemValue)}>
              {dietOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={
                education
                  ? 'Education: ' + education.toString()
                  : 'Set Education'
              }
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={education}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setEducation(itemValue)}>
              {educationOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={kids ? 'Kids: ' + kids.toString() : 'Set Kids'}
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={kids}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setKids(itemValue)}>
              {kidsOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={
                language ? 'Language: ' + language.toString() : 'Set Language'
              }
              onPress={toggleOverlay}
            />
            <Picker
              selectedValue={language}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}>
              {LanguageOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={music ? 'Music: ' + music.toString() : 'Set Music'}
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={music}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setMusic(itemValue)}>
              {musicOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={pets ? 'Pets: ' + pets.toString() : 'Set Pets'}
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={pets}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setPets(itemValue)}>
              {petsOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={smoke ? 'Smoke? ' + smoke.toString() : 'Set Smoke'}
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={smoke}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setSmoke(itemValue)}>
              {smokeOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={sport ? 'Sport? ' + sport.toString() : 'Set Sport'}
              onPress={toggleOverlay}
            />
            <Picker
              selectedValue={sport}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setSport(itemValue)}>
              {sportOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />
          <View>
            <Button
              title={tattoos ? 'Tattoos? ' + tattoos.toString() : 'Set Tattoes'}
              onPress={toggleOverlay}
            />

            <Picker
              selectedValue={tattoos}
              style={{height: 150, width: 350}}
              onValueChange={(itemValue, itemIndex) => setTattoos(itemValue)}>
              {tattoosOptions.map((item) => (
                <Picker.Item
                  label={item.label}
                  value={item.label}
                  key={item.value}
                  mode="dropdown"
                />
              ))}
            </Picker>
          </View>

          <Card.Divider />

          <Button
            icon={<Icon name="pencil" size={18} color="black" />}
            title="Go back to home screen"
            onPress={function () {
              let currentUser = {
                displayname: displayname,
                aboutMe: aboutMe,

                height: height,
                weight: weight,
                role: role,
                bodyType: bodyType,
                relationsipStatus: relationsipStatus,
                location: location,
                tribes: tribes,
                lookingFor: lookingFor,
                hivStatus: hivStatus,
                alcohol: alcohol,
                diet: diet,
                education: education,
                kids: kids,
                language: language,
                music: music,
                pets: pets,
                smoke: smoke,
                sport: sport,
                tattoos: tattoos,
              };
              onSubmit(currentUser);
            }}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginTop: 50,
    color: 'white',
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
  background: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 10,
    marginTop: 20,
  },
  spliter: {
    alignSelf: 'stretch',
    height: 0.5,
    backgroundColor: Colors.darkGreyBlue,
  },
  itemContainerStyle: {
    height: 48,
    backgroundColor: 'black',
    marginLeft: 16,
    marginRight: 16,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.darkGreyBlue,
  },
  title: {
    fontSize: 17,
    color: 'white',
  },
  text: {
    fontSize: 17,
    color: Colors.pinkRed,
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#991c22',
  },
});

{
  /* <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Form
            title={'Edit Profile'} //this is the button title
            fields={fields}
            initialData={initialData} //used in edit mode
            onSubmit={onSubmit}
            loading={loading}
            showImagePicker={showImagePicker}
            style={{}}
          />
        </View>
      </View> */
}
