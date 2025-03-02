import { useThemeContext } from '@src/context/Theme'
import { mainColors } from '@src/styles'
import { StyleSheet, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

interface QRProps {
	size: number
	value: string
	onError: () => void
}

export default function QR({ size, value, onError }: QRProps) {
	const { theme } = useThemeContext()
	return (
		<View style={theme === 'Dark' ? styles.qrWrap : {}}>
			<QRCode
				size={size}
				value={value}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				logo={require('@assets/app-icon-all.png')}
				logoBorderRadius={10}
				logoBackgroundColor={mainColors.WHITE}
				logoMargin={3}
				onError={onError}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	qrWrap: {
		borderWidth: 5,
		borderColor: mainColors.WHITE
	}
})