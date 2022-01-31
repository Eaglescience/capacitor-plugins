import { useState } from 'react';
import { GoogleMap } from '@capacitor/google-maps';
import { IonButton, IonTextarea } from '@ionic/react';
import BaseTestingPage from '../../components/BaseTestingPage';

const CreateAndDestroyMapPage: React.FC = () => {
    const [map, setMap] = useState<GoogleMap | null>(null);
    const [commandOutput, setCommandOutput] = useState('');

    async function createMap() {
        setCommandOutput("");
        try {            
            const newMap = await GoogleMap.create("test-map", {
                center: {
                    lat: 0,
                    lng: 0,
                },
                zoom: 8,
                androidLiteMode: false,
                height: 300,
                width: 300,
                x: 0,
                y: 0,
            });
    
            setMap(newMap);
            setCommandOutput('Map created');
        } catch(err: any) {
            setCommandOutput(err.message);
        }        
    }

    async function destroyMap() {
        setCommandOutput("");
        try {
            if (map) {
                await map.destroy();
                setCommandOutput('Map destroyed');
            }
        } catch (err: any) {
            setCommandOutput(err.message);
        }
    }

    return (
        <BaseTestingPage pageTitle="Create and Destroy Map">
            <div>
                <IonButton expand="block" id="createMapButton" onClick={createMap}>
                    Create Map
                </IonButton>
                <IonButton expand="block" id="destroyMapButton" onClick={destroyMap}>
                    Destroy Map
                </IonButton>
            </div>
            <div>
                <IonTextarea id="commandOutput" value={commandOutput}></IonTextarea>
            </div>
        </BaseTestingPage>
    )
}

export default CreateAndDestroyMapPage;