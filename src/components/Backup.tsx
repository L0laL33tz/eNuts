import { l } from '@log'
import { ThemeContext } from '@src/context/Theme'
import { highlight as hi } from '@styles'
import { formatMintUrl } from '@util'
import * as Clipboard from 'expo-clipboard'
import { useContext, useState } from 'react'
import { Share, StyleSheet, Text } from 'react-native'

import ActionButtons from './ActionButtons'

interface IBackupSuccessProps {
	token: string
	mint?: string
}

export default function BackupSuccess({ token, mint }: IBackupSuccessProps) {
	const { color, highlight } = useContext(ThemeContext)
	const [copied, setCopied] = useState(false)
	const handleShare = async () => {
		try {
			const res = await Share.share({
				message: token, // `cashu://${route.params.token}`
				url: `cashu://${token}`
			})
			if (res.action === Share.sharedAction) {
				if (res.activityType) {
					// shared with activity type of result.activityType
					l('shared with activity type of result.activityType')
				} else {
					// shared
					l('shared')
				}
			} else if (res.action === Share.dismissedAction) {
				// dismissed
				l('sharing dismissed')
			}
		} catch (e) {
			l(e)
		}
	}
	const handleCopy = async () => {
		await Clipboard.setStringAsync(token)
		setCopied(true)
		const t = setTimeout(() => {
			setCopied(false)
			clearTimeout(t)
		}, 3000)
	}
	return (
		<>
			<Text style={[styles.successTxt, { color: hi[highlight] }]}>
				Backup token created!
			</Text>
			<Text style={[styles.subTxt, { color: color.TEXT }]}>
				Copy the token and keep it in a safe place.
			</Text>
			<Text style={[styles.token, { color: color.TEXT }]}>
				{token.substring(0, 25)}...
			</Text>
			{mint &&
				<Text style={[styles.token, { color: color.TEXT }]}>
					Mint: {formatMintUrl(mint)}
				</Text>
			}
			<ActionButtons
				absolutePos
				topBtnTxt='Share'
				topBtnAction={() => void handleShare()}
				bottomBtnTxt={copied ? 'Copied!' : 'Copy backup token'}
				bottomBtnAction={() => void handleCopy()}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	successTxt: {
		marginTop: 25,
		fontSize: 32,
		fontWeight: '600',
		textAlign: 'center',
	},
	subTxt: {
		marginTop: 20,
		fontSize: 20,
		fontWeight: '500',
		textAlign: 'center',
	},
	token: {
		textAlign: 'center',
		marginTop: 20,
		fontSize: 16,
	},
	action: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		left: 0,
		padding: 20,

	}
})