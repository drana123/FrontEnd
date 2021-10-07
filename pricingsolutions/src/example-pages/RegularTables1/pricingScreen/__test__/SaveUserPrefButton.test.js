import React , {Component} from 'react';
import {render ,screen ,fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from '../../../../config/configureStore';
import {SaveUserPrefButton} from '../GridViewComponents/SaveUserPrefButton';
import setDefaultpreferences from '../../../../reducers/setDefaultpreferences';

describe('Save User Preference Button Component Testing' , ()=>{
    const store= configureStore();
    test('should render Save User preference Component without crashing' , ()=>{
        const componentUnderTest = render(<Provider store = {store}> <SaveUserPrefButton/> </Provider>);
        expect(componentUnderTest).toBeInTheDocument;
    });
    test('should contain Save User preference Button' , ()=>{
        render(<Provider store = {store}> <SaveUserPrefButton/> </Provider>);
        const componentUnderTest = screen.getAllByTestId("savePrefBtn");
        expect(componentUnderTest).toBeInTheDocument;
    });
    test('should display Save Preference text' , ()=>{
        render(<Provider store = {store}> <SaveUserPrefButton/> </Provider>);
        const component = screen.getByTestId("savePrefBtn");
        expect(component.textContent).toBe("Save Your Preference");
    });
    
    test('should test button click for adding perference Successfully' , ()=>{
        let mockSavePrefCount = 0;
        let mockUpdatePrefCount = 0;
        let mockResetCount = 0;
        
        const mockSavePref = ()=>{
            mockSavePrefCount++;
        }
        const mockUpdatePref = ()=>{
            mockUpdatePrefCount++;
        }
        const mockReset = ()=>{
            mockResetCount++;
        }
        
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : false,
            saveUserLoadingStatus : true,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : false,
            saveUserErrorStatus : false,
        };
          const {getByTestId} = render(<SaveUserPrefButton
            preference = {setDefaultpreferences()}
             isHavingPreference = {0}
             loadingStatus = {loadingStatus}
             ErrorStatus = {ErrorStatus}
             handleSavePreference = {mockSavePref}
             handleUpdatePreference = {mockUpdatePref}
             resetSavePrefStatus = {mockReset}
            />);
        
            fireEvent.click(getByTestId("savePrefBtn"));
        expect(mockSavePrefCount).toBeGreaterThanOrEqual(1);
        expect(mockUpdatePrefCount).toEqual(0);        
        expect(mockResetCount).toBeGreaterThanOrEqual(1);
    });

    test('should test button click for adding perference with errors in saving preferences' , ()=>{
        let mockSavePrefCount = 0;
        let mockUpdatePrefCount = 0;
        let mockResetCount = 0;
        
        const mockSavePref = ()=>{
            mockSavePrefCount++;
        }
        const mockUpdatePref = ()=>{
            mockUpdatePrefCount++;
        }
        const mockReset = ()=>{
            mockResetCount++;
        }
        
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : false,
            saveUserLoadingStatus : true,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : false,
            saveUserErrorStatus : true,
        };
          const {getByTestId} = render(<SaveUserPrefButton
            preference = {setDefaultpreferences()}
            isHavingPreference = {0}
            loadingStatus = {loadingStatus}
            ErrorStatus = {ErrorStatus}
            handleSavePreference = {mockSavePref}
            handleUpdatePreference = {mockUpdatePref}
            resetSavePrefStatus = {mockReset}
            />);
        
            fireEvent.click(getByTestId("savePrefBtn"));
        expect(mockSavePrefCount).toBeGreaterThanOrEqual(1);
        expect(mockUpdatePrefCount).toEqual(0);        
        expect(mockResetCount).toBeGreaterThanOrEqual(1);
    });

    test('should test button click for update perference saving preferences successfully' , ()=>{
        let mockSavePrefCount = 0;
        let mockUpdatePrefCount = 0;
        let mockResetCount = 0;
        
        const mockSavePref = ()=>{
            mockSavePrefCount++;
        }
        const mockUpdatePref = ()=>{
            mockUpdatePrefCount++;
        }
        const mockReset = ()=>{
            mockResetCount++;
        }
        
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : false,
            saveUserLoadingStatus : true,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : false,
            saveUserErrorStatus : false,
        };
        const {getByTestId} = render(<SaveUserPrefButton
            preference = {setDefaultpreferences()}
            isHavingPreference = {1}
            loadingStatus = {loadingStatus}
            ErrorStatus = {ErrorStatus}
            handleSavePreference = {mockSavePref}
            handleUpdatePreference = {mockUpdatePref}
            resetSavePrefStatus = {mockReset}
            />);
        
            fireEvent.click(getByTestId("savePrefBtn"));
        expect(mockSavePrefCount).toEqual(0);
        expect(mockUpdatePrefCount).toBeGreaterThanOrEqual(1);        
        expect(mockResetCount).toBeGreaterThanOrEqual(1);
    });


    test('should test button click for update perference with error in saving preferences' , ()=>{
        let mockSavePrefCount = 0;
        let mockUpdatePrefCount = 0;
        let mockResetCount = 0;
        
        const mockSavePref = ()=>{
            mockSavePrefCount++;
        }
        const mockUpdatePref = ()=>{
            mockUpdatePrefCount++;
        }
        const mockReset = ()=>{
            mockResetCount++;
        }
        
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : false,
            saveUserLoadingStatus : true,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : false,
            saveUserErrorStatus : true,
        };
        const {getByTestId} = render(<SaveUserPrefButton
            preference = {setDefaultpreferences()}
            isHavingPreference = {1}
            loadingStatus = {loadingStatus}
            ErrorStatus = {ErrorStatus}
            handleSavePreference = {mockSavePref}
            handleUpdatePreference = {mockUpdatePref}
            resetSavePrefStatus = {mockReset}
            />);
        
            fireEvent.click(getByTestId("savePrefBtn"));
        expect(mockSavePrefCount).toEqual(0);
        expect(mockUpdatePrefCount).toBeGreaterThanOrEqual(1);        
        expect(mockResetCount).toBeGreaterThanOrEqual(1);
    });
});

