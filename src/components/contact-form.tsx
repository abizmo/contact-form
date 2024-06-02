// 'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card'
import { Checkbox } from '@ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@ui/form'
import { Input } from '@ui/input'
import { RadioGroup, RadioGroupItem } from '@ui/radio-group'
import { toast } from '@ui/use-toast'
import { Textarea } from '@ui/textarea'

const contactFormSchema = z.object({
  first_name: z.string().trim().min(1, {
    message: 'This field is required'
  }),
  last_name: z.string().trim().min(1, {
    message: 'This field is required'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  query_type: z.enum(['general', 'support'], {
    required_error: 'Please select a query type'
  }),
  message: z.string().trim().min(1, {
    message: 'This field is required'
  }),
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'To submit this form, please consent to being contacted'
    })
  })
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const defaultValues: Partial<ContactFormValues> = {
  first_name: '',
  last_name: '',
  email: '',
  message: '',
  consent: undefined
}

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: 'onChange'
  })

  function onSubmit(data: ContactFormValues) {
    console.log(data)
    toast({
      title: 'Message sent!',
      description: "Thanks for completing the form. We'll be in touch soon."
    })
  }

  return (
    <Card className='max-w-3xl mx-auto mt-8'>
      <Form {...form}>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name='first_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='last_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='query_type'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Query Type</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-wrap'
                  >
                    <FormItem className='border border-input rounded-lg px-6 py-3 flex items-center gap-4 flex-1 min-w-max space-y-0 has-[:checked]:bg-background'>
                      <FormControl>
                        <RadioGroupItem value='general' />
                      </FormControl>
                      <FormLabel className='text-lg'>General Enquiry</FormLabel>
                    </FormItem>
                    <FormItem className='border border-input rounded-lg px-6 py-3 flex items-center gap-4 flex-1 min-w-max space-y-0 has-[:checked]:bg-background'>
                      <FormControl>
                        <RadioGroupItem value='support' />
                      </FormControl>
                      <FormLabel className='text-lg'>Support Request</FormLabel>
                    </FormItem>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='consent'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel className='normal-case'>
                      I consent to being contacted by the team
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type='submit'>Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
