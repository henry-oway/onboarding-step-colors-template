'use client'
import React from 'react'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Sketch } from '@uiw/react-color'

type StepStatus =
	| 'unvisited'
	| 'current'
	| 'incomplete'
	| 'complete'
	| 'in_review'

interface Step {
	key: string
	label: string
	status: StepStatus
}

interface ColorState {
	unvisited: string
	current: string
	incomplete: string
	complete: string
	in_review: string
}

interface ColorInfo {
	label: string
	status: StepStatus
}

const STEPS: Step[] = [
	{ key: 'welcome', label: 'Welcome', status: 'complete' },
	{ key: 'contact', label: 'Contact', status: 'current' },
	{ key: 'permits', label: 'Permits', status: 'in_review' },
	{ key: 'insurance', label: 'Insurance', status: 'in_review' },
	{ key: 'fleet', label: 'Fleet', status: 'incomplete' },
	{ key: 'financials', label: 'Financials', status: 'incomplete' },
	{ key: 'review', label: 'Review', status: 'unvisited' }
]

const initialColors: ColorState = {
	unvisited: '#70717a',
	current: '#5942E8',
	incomplete: '#FFD600',
	complete: '#00d85E',
	in_review: '#F5A524'
}

const COLOR_INFO: ColorInfo[] = [
	{ label: 'Unvisited', status: 'unvisited' },
	{ label: 'Current', status: 'current' },
	{ label: 'In Review', status: 'in_review' },
	{ label: 'Incomplete', status: 'incomplete' },
	{ label: 'Complete', status: 'complete' }
]

const getStepColor = (status: StepStatus, colors: ColorState): string => {
	return colors[status]
}

const getStepIcon = (status: StepStatus): string | null => {
	switch (status) {
		case 'incomplete':
			return 'solar:danger-triangle-bold'
		case 'in_review':
			return 'solar:clock-circle-bold'
		case 'complete':
			return 'lets-icons:check-fill'
		default:
			return null
	}
}

const OnboardingForm = () => {
	const [colors, setColors] = useState<ColorState>(initialColors)
	const [selectedStatus, setSelectedStatus] = useState<StepStatus | null>(null)

	const hasColorChanged = (status: StepStatus) => {
		return colors[status] !== initialColors[status]
	}

	const hasAnyColorChanged = () => {
		return Object.keys(colors).some((status) => hasColorChanged(status as StepStatus))
	}

	const resetAllColors = () => {
		setColors(initialColors)
	}

	const resetColor = (status: StepStatus) => {
		setColors(prev => ({
			...prev,
			[status]: initialColors[status]
		}))
	}

	const copyPalette = () => {
		const formattedPalette = Object.entries(colors)
			.map(([status, color]) => {
				const unchanged = !hasColorChanged(status as StepStatus)
				return `  ${status}: '${color}'${unchanged ? ' (unchanged)' : ''}`
			})
			.join(',\n')

		navigator.clipboard.writeText(formattedPalette)
	}

	return (
		<div className='min-h-screen bg-[#121516]'>
			<div className='flex justify-center w-full'>
				<div className='flex flex-col max-w-[960px] items-start relative'>
					<header className='flex items-start justify-around gap-3 pt-4 pb-8 px-4 relative self-stretch w-full'>
						<div className='min-w-72 gap-3 flex-1 grow flex flex-col items-start relative'>
							<h1 className='relative self-stretch mt-[-1.00px] font-extrabold text-white text-4xl tracking-[-1.00px] leading-[45px]'>
								Welcome to Oway!
							</h1>
						</div>
					</header>

					<nav className='flex items-center justify-center gap-2.5 p-4 relative self-stretch w-full'>
						{STEPS.map(step => {
							const stepColor = getStepColor(step.status, colors)
							const stepIcon = getStepIcon(step.status)

							return (
								<div
									key={step.key}
									className='flex flex-col items-center justify-center gap-2 relative flex-1 grow rounded cursor-pointer'
									onClick={() => setSelectedStatus(step.status)}
								>
									<div
										className='relative self-stretch w-full h-2 rounded'
										style={{ backgroundColor: stepColor }}
									/>
									<div className='w-fit font-normal text-white text-base text-center'>
										{step.label}
									</div>
									{stepIcon && (
										<Icon
											icon={stepIcon}
											className='absolute w-6 h-6 -top-8 left-[46px]'
											style={{ color: stepColor }}
										/>
									)}
								</div>
							)
						})}
					</nav>

					{selectedStatus && (
						<div className='absolute top-32 left-1/2 transform -translate-x-1/2 z-50 bg-[#1f2937] p-4 rounded-lg shadow-xl'>
							<Sketch
								color={colors[selectedStatus]}
								onChange={color => {
									setColors(prev => ({
										...prev,
										[selectedStatus]: color.hex
									}))
								}}
							/>
							<button
								className='mt-2 text-white text-sm'
								onClick={() => setSelectedStatus(null)}
							>
								Close
							</button>
						</div>
					)}

					<main className='p-6 space-y-6 w-full pointer-events-none'>
						{/* Company Information Section */}
						<div className='space-y-3 w-full'>
							<div className='flex justify-between items-center'>
								<h2 className='text-2xl font-bold text-white'>
									Company Information
								</h2>
								<div className='text-sm text-white/60'>
									I'm signed in with my company email
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4 w-full'>
								<Input
									label='Company Name'
									placeholder='Enter company name'
									classNames={{
										inputWrapper: 'h-14 bg-[#1f2937]',
										input: 'text-white',
										label: 'text-white'
									}}
								/>
								<Input
									label='Email Domain'
									placeholder='e.g. company.com'
									classNames={{
										inputWrapper: 'h-14 bg-[#1f2937]',
										input: 'text-white',
										label: 'text-white'
									}}
									description='New users that verify an email matching this domain will be added to your company.'
								/>
							</div>
						</div>

						{/* Point of Contact Section */}
						<div className='space-y-3 w-full'>
							<div className='flex justify-between items-center'>
								<h2 className='text-2xl font-bold text-white'>
									Point of Contact
								</h2>
								<div className='text-sm text-white/60'>
									I am the main point of contact
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4 w-full'>
								<Input
									label='Full Name'
									placeholder='Enter your full name'
									classNames={{
										inputWrapper: 'h-14 bg-[#1f2937]',
										input: 'text-white',
										label: 'text-white'
									}}
								/>
								<Input
									label='Phone Number'
									placeholder='Enter phone number'
									classNames={{
										inputWrapper: 'h-14 bg-[#1f2937]',
										input: 'text-white',
										label: 'text-white'
									}}
								/>
								<Input
									label='Email'
									placeholder='Enter your email'
									classNames={{
										inputWrapper: 'h-14 bg-[#1f2937]',
										input: 'text-white',
										label: 'text-white'
									}}
								/>
							</div>
						</div>

						{/* Team Members Section */}
						<div className='space-y-3 w-full'>
							<h2 className='text-2xl font-bold text-white'>Team Members</h2>
							<p className='text-white/60'>
								Add team members who should have access to the platform. You can
								add more later.
							</p>

							<div className='w-full'>
								<div className='flex gap-4 w-full items-start'>
									<Input
										placeholder='Email address'
										className='flex-1'
										classNames={{
											inputWrapper: 'bg-[#1f2937] h-14',
											input: 'text-white',
											label: 'text-white'
										}}
										isClearable
									/>
									<Input
										label='Role'
										placeholder='Select role'
										className='w-[200px]'
										classNames={{
											inputWrapper: 'h-14 bg-[#1f2937]',
											input: 'text-white',
											label: 'text-white'
										}}
										disabled
									/>
									<Button isIconOnly className='w-14 h-14' variant='light'>
										<Icon icon='solar:add-square-linear' className='w-8 h-8' />
									</Button>
								</div>
							</div>
						</div>
					</main>

					<footer className='flex justify-between p-6 border-t border-divider w-full'>
						<div className='w-full space-y-4 p-4 border border-white/20 rounded-lg'>
							<div className='flex justify-between items-center'>
								<h3 className='text-lg font-bold text-white'>Color Settings</h3>
								<div className='flex gap-2'>
									<button
										onClick={resetAllColors}
										disabled={!hasAnyColorChanged()}
										className='px-3 py-1 text-sm text-white/60 hover:text-white border border-white/20 rounded-md hover:border-white/60 disabled:opacity-50 disabled:hover:border-white/20 disabled:hover:text-white/60 disabled:cursor-not-allowed'
									>
										Reset All
									</button>
									<button
										onClick={copyPalette}
										className='px-3 py-1 text-sm text-white/60 hover:text-white border border-white/20 rounded-md hover:border-white/60'
									>
										Copy Palette
									</button>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								{COLOR_INFO.map(({ label, status }) => (
									<div key={status} className='flex items-center gap-3'>
										<div
											className='w-4 h-4 rounded cursor-pointer hover:ring-2 hover:ring-white/30'
											style={{ backgroundColor: colors[status] }}
											onClick={() => setSelectedStatus(status)}
										/>
										<span className='text-white/60'>{label}:</span>
										<span className='text-white font-mono'>
											{colors[status]}
										</span>
										{hasColorChanged(status) && (
											<button
												onClick={() => resetColor(status)}
												className='text-xs text-white/60 hover:text-white'
											>
												Reset
											</button>
										)}
									</div>
								))}
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	)
}

export default OnboardingForm
