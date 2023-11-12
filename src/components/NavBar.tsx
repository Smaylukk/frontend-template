import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { UserType } from '../store/UserStore'
import logo from '../logo.png'
import { Box, Button, Flex, HStack, Image, Link, Stack, Text } from '@chakra-ui/react'

const NavBar = observer(() => {
  const { userStore } = useContext(Context) as UserType

  const logout = () => {
    userStore.user = {
      name: '',
      email: '',
      id: 0,
    }
    userStore.isAuth = false
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='nowrap'
      w='100%'
      mb={1}
      p={1}
      bg={['teal']}
      color={['white']}
    >
      <HStack alignItems='flex-start'>
        <Image src={logo} height='30' alt='' loading='lazy' />
        <Text fontSize='lg' fontWeight='bold' as={'a'} href={'/'}>
          ToDo-list {userStore.isAuth ? `- ${userStore.user.email}(${userStore.user.name})` : ''}
        </Text>
      </HStack>
      <Box flexBasis={{ base: '100%', md: 'auto' }}>
        <Stack
          spacing={8}
          align='center'
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <Link href={'/'}>
            <Text display='block'>
              <Button
                size='sm'
                rounded='md'
                color={['white']}
                bg={['teal']}
                _hover={{
                  bg: ['black'],
                }}
                mr={5}
                onClick={() => logout()}
              >
                Вийти
              </Button>
            </Text>
          </Link>
        </Stack>
      </Box>
    </Flex>
  )
})

export default NavBar
