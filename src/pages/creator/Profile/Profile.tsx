import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
import { IconButton, Dialog, Typography, CircularProgress } from '@material-ui/core';
import { ReactComponent as QuestionIcon } from '../../../img/question.svg';
import { ReactComponent as ProfileImagePlaceholder } from '../../../img/add-picture-icon.svg';

import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import styled from 'styled-components';
import RootStore from '../../../stores/RootStore';
import { COLHeader, COLSubHeader, COLInstructionHeader, COLErrorMessage } from '../../../components/Typography/Typography';
import COLTextButton from '../../../components/Button/COLTextButton';
import COLPrimaryButton from '../../../components/Button/COLPrimaryButton';
import { COLTextField } from '../../../components/TextField/COLTextField';
import FlexContainer from '../../../components/Container/FlexContainer';

const ProfileSchema = Yup.object().shape({
  aboutMe: Yup.string()
    .required('Enter your description')
    .min(3, 'Must be at least 3 characters'),
});
export interface ProfileFormValues {
  aboutMe: string;
}
const AvatarContainer = styled.div`
&& {
    margin: 16px;
    width: 80px;
    height: 80px;
    display: inline-block;
  }
`;

const CropperContainer = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;

    visibility: ${(props: {isCropping: boolean}) => props.isCropping ? 'visible' : 'hidden'};
    background-color: rgba(0, 0, 0, 0.7);

`;

const CropButtonContainer = styled.div`

    background-color: white;
    overflow: auto;

`;

interface Props {
  
}
interface InjectedProps extends Props {
  rootStore: RootStore
}

@inject('rootStore')
@observer

export default class Profile extends React.Component<Props, {}> {

  private cropper?: Cropper;
  fileInput?: any;

  get injected() {
    return this.props as InjectedProps;
  }

  componentDidMount() {

  }

  handleChange = (event: any) => {

    if (event.currentTarget.files && event.currentTarget.files[0]) {

      const url = window.URL.createObjectURL(event.currentTarget.files[0]);

      const { rootStore } = this.injected;
      const { registrationStore } = rootStore;
      registrationStore.selectImage(url); 

    }
  }

  handleTextChange(event: any) {
    // this.props.creatorStore!.updateUser(event.currentTarget.name, event.currentTarget.value);
  }

  confirmCrop = () => {

    // only attempt to crop if user selected an image, otherwise browser will crash.
    if (this.cropper && this.cropper.getCroppedCanvas()) {
      const croppedImage = this.cropper.getCroppedCanvas().toDataURL();

      const rootStore = this.injected.rootStore;
      const { registrationStore } = rootStore;
      registrationStore.cropImage(croppedImage);
    }

  }

  handleSubmit = () => {

    // if (this.props.creatorStore!.user.croppedImageURL === undefined) {
    //   this.confirmCrop();
    // }
    // this.props.creatorStore!.register();

  }

  render() {

    const rootStore = this.injected.rootStore;
    const { registrationStore } = rootStore;

    // show normal avatar or cropper based on user selection.
    const isCropping = registrationStore.cropping;
    let profilePage;

    profilePage = (
      <div>
        <COLHeader
          style={{marginBottom: '24px'}}
        >
          Complete your profile
        </COLHeader>
        <COLInstructionHeader>
          Add a profile picture
        </COLInstructionHeader>
        <COLSubHeader>
          Use a photo that your Supporters can easily recognize.
        </COLSubHeader>
        <FlexContainer>
          <AvatarContainer>
            {registrationStore.croppedImageURL ? (
              <Avatar
                alt="Profile picture"
                src={registrationStore.croppedImageURL}
                style={{width: '100%', height: '100%'}}
              />
              ) : (
                <ProfileImagePlaceholder style={{width: '100%', height: '100%'}}/>
              )
            }
          </AvatarContainer>
          <div>
            <COLTextButton
              fullWidth={false}
              border
              style={{ float: 'left', height: '32px', marginBottom: '2px', marginRight: '8px'}}
              onClick={() => this.fileInput.click()}
            >
              Choose a photo
            </COLTextButton>
            <COLTextButton
              border
              fullWidth={false}
              style={{ float: 'left', height: '32px', display: `${registrationStore.profileImageURL ? 'block' : 'none'}`}}
              onClick={() => registrationStore.toggleCropping()}
            >
              Crop
            </COLTextButton>
          </div>
        </FlexContainer>

        <FlexContainer>
          <COLInstructionHeader>
          Add a description
          </COLInstructionHeader>
          <IconButton
            onClick={() => registrationStore.toggleShowHelp('description')}
          >
            <QuestionIcon/>
          </IconButton>
        </FlexContainer>
        <COLSubHeader>
          Something about yourself so Supporters can get to know you. 
        </COLSubHeader>
        <Formik
          initialValues={{
            aboutMe: ''
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values: ProfileFormValues) => {
            registrationStore.register();
          }}
          render={(formikBag: FormikProps<ProfileFormValues>) => (
            <Form>
              <Field
                name="aboutMe"
                render={({ field, form }: FieldProps<ProfileFormValues>) => (
                  <>
                    <COLTextField
                      placeholder="I am..."
                      fullWidth={true}
                      multiline={true}
                      rowsMax={10}
                      {...field}
                    />
                    <COLErrorMessage>
                    {form.touched.aboutMe &&
                      form.errors.aboutMe &&
                      form.errors.aboutMe}
                      </COLErrorMessage>
                  </>
                )}
              />
              <COLPrimaryButton
                type="submit"
                style={{margin: '56px 0 16px 0'}}
                // disabled={registrationStore.aboutMe.length < 3}
              >
                Continue
              </COLPrimaryButton>
            </Form>
          )}
        />

          <CropperContainer
            isCropping={isCropping}
          >
          <div>
            <Cropper
              ref={(ref: any) => this.cropper = ref}
              src={registrationStore.profileImageURL}
              className="cropperContainer"
              // Cropper.js options
              // minContainerHeight={400}
              // minContainerWidth={300}
              autoCrop={true}
              aspectRatio={1}
              guides={true}
              background={false}
              ready={this.confirmCrop}
            />
            <CropButtonContainer>
              <COLTextButton
                fullWidth={false}
                style={{ float: 'left', }}
                onClick={registrationStore.toggleCropping}
              >
                  Cancel
              </COLTextButton>
              <COLTextButton
                fullWidth={false}
                style={{ float: 'right' }}
                onClick={this.confirmCrop}
              >
                Confirm
              </COLTextButton>
            </CropButtonContainer>
            </div>
          </CropperContainer>
        <Dialog
          open={registrationStore.showHelp.description}
          onClose={() => registrationStore.toggleShowHelp('description')}
        >

          <div>
            <div>
              <Typography
                style={{ padding: '16px' }}
              >
                This description will be shown on your profile page. 
                Let Supporters know what you will be doing on Collide and why they should subscribe to you.
              </Typography>
            </div>
            <COLTextButton
              border={false}
              onClick={() => registrationStore.toggleShowHelp('description')}
            >
            Done
            </COLTextButton>
          </div>

        </Dialog>
      </div>
    );

    // }
    return (
      <div>
        {registrationStore.loading ? (
          <CircularProgress/>
        ) : (
          <div>
            <input
              id="choosePhotoButton"
              ref={fileInput => this.fileInput = fileInput} 
              type="file"
              accept="image/*"
              multiple={false}
              style={{display: 'none'}}
              onChange={this.handleChange}
              onClick={(event) => { 
                event.currentTarget.value = '';
              }}
 
            />
            {profilePage}
          </div>
        )
        }
      </div>
    );
  }
}
